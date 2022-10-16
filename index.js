'use strict'
const path = require('path')
const Analyzer = require('@goto-bus-stop/common-shake').Analyzer
const transformAst = require('transform-ast')
const wrapComment = require('wrap-comment')
const through = require('through2')
const convertSourceMap = require('convert-source-map')

module.exports = function commonShake (b, opts) {
  if (typeof b !== 'object') {
    throw new Error('common-shakeify: must be used as a plugin, not a transform')
  }

  const basedir = b._options.basedir || process.cwd()
  const seen = {}
  opts = Object.assign({
    verbose: false,
    onExportDelete (source, name) {
      if (opts.verbose || opts.v) {
        console.warn('common-shake: removed', `\`${name}\``, 'in', path.relative(basedir, source))
      }
    },
    onModuleBailout (resource, reasons) {
      if (opts.verbose || opts.v) {
        reasons.forEach((reason) => {
          if (seen[resource.resource + reason.reason]) return
          seen[resource.resource + reason.reason] = true
          const loc = reason.loc.start
          const source = reason.source || resource.resource
          console.warn('common-shake: bailed out: ', reason.reason, 'in', `${path.relative(basedir, source)}:${loc.line}:${loc.column}`)
        })
      }
    },
    onGlobalBailout (reasons) {
      if (opts.verbose || opts.v) {
        reasons.forEach((reason) => {
          const loc = reason.loc.start
          console.warn('common-shake: GLOBAL BAILOUT:', reason.reason, 'in', `${path.relative(basedir, reason.source)}:${loc.line}:${loc.column}`)
        })
      }
    }
  }, opts)

  opts.sourceMap = !!b._options.debug
  opts.fullPaths = !!b._options.fullPaths

  addHooks()
  b.on('reset', addHooks)
  function addHooks () {
    const packages = new Map()
    const aliases = new Map()
    b._mdeps.on('package', (pkg) => {
      packages.set(pkg.__dirname, pkg)
    })
    b._mdeps.on('file', (file, id) => {
      aliases.set(id, file)
    })
    b.pipeline.get('label').unshift(createStream(opts, {
      getSideEffects (name) {
        const file = aliases.get(name) || name
        let pkg
        let dir = file
        let prevDir = null
        while (!pkg && (dir = path.dirname(dir)) && prevDir !== dir) {
          pkg = packages.get(dir)
          prevDir = dir
        }
        return !(pkg && pkg.sideEffects === false)
      }
    }))
  }
}

function createStream (opts, api) {
  const analyzer = new Analyzer()

  const rows = new Map()
  const strings = new Map()
  const duplicates = new Map()

  return through.obj(onfile, onend)

  function onfile (row, enc, next) {
    const index = opts.fullPaths ? row.file : row.index
    let source = row.source

    if (row.dedupe) {
      // For modules that were deduped, attach the duplicates to the original row,
      // and pass the original source to the analyzer.
      // Later on, we'll merge the used declarations together, so everything still
      // works if dependencies of different copies of the deduped module use
      // different parts of that module.
      const deduped = rows.get(row.dedupeIndex)
      if (deduped) {
        addDuplicate(deduped, row)
        source = deduped.source
      } else {
        return next(new Error(`Could not redupe module ${row.file}`))
      }
    }

    let ast
    const string = transformAst(source, {
      locations: true,
      ecmaVersion: opts.ecmaVersion !== undefined ? opts.ecmaVersion : 10,
      inputFilename: row.file
    }, (node) => {
      if (node.type === 'Program') ast = node
    })
    analyzer.run(ast, index, {
      sideEffects: api.getSideEffects(row.file)
    })

    const deps = opts.fullPaths ? row.deps : row.indexDeps
    Object.keys(deps).forEach((name) => {
      if (deps[name]) {
        analyzer.resolve(index, name, deps[name])
      }
    })

    if (row.entry) {
      analyzer.getModule(index).forceExport()
    }

    rows.set(index, row)
    strings.set(index, string)

    next()
  }

  function onend (next) {
    if (!analyzer.isSuccess()) {
      opts.onGlobalBailout(analyzer.bailouts)

      rows.forEach((row) => {
        this.push(row)
      })
      next()
      return
    }

    analyzer.modules.forEach((module, key) => {
      const string = strings.get(key)
      const row = rows.get(key)
      const dupes = getDuplicates(row)

      // If this module was a duplicate of another module,
      // the original module will have been rewritten already.
      if (row.dedupe) {
        return
      }

      if (module.bailouts) {
        opts.onModuleBailout(module, module.bailouts)
        return
      }

      if (module.getInfo().removeImport) {
        return
      }

      module.getDeclarations().forEach((decl) => {
        if (!isUsed(decl.name)) {
          if (opts.onExportDelete(row.sourceFile || row.file, decl.name) !== false) {
            remove(string, decl.ast)
          }
        }
      })

      // Check if a name was used in this module, or
      // in any of this module's deduped versions.
      function isUsed (name) {
        if (module.isUsed(name)) {
          return true
        }
        if (dupes.length > 0) {
          return dupes.some((dupe) => {
            const m = analyzer.modules.get(dupe.index)
            return m && m.isUsed(name)
          })
        }
        return false
      }
    })

    rows.forEach((row, index) => {
      const module = analyzer.getModule(index)
      if (module && module.getInfo().removeImport) {
        return
      }

      if (row.dedupe || module.bailouts) {
        this.push(row)
        return
      }

      const string = strings.get(index)

      Object.keys(row.indexDeps).forEach((depName) => {
        const depModule = analyzer.getModule(row.indexDeps[depName])
        if (depModule && depModule.getInfo().removeImport) {
          delete row.indexDeps[depName]
          delete row.deps[depName]
          const imports = module.requireNodes.get(depName) || []
          imports.forEach((node) => {
            // We can replace this with `undefined` because this will not be a .property.
            // If it was a require('mod').property, the .property would be marked as used,
            // and the module's import would not be removable
            node.edit.update(`void 0 ${wrapComment(node.getSource())}`)
          })
        }
      })

      const transformed = string.toString()
      if (opts.sourceMap) {
        row.source = transformed + '\n' + convertSourceMap.fromObject(string.map).toComment()
      } else {
        row.source = transformed
      }

      this.push(row)
    })

    next()
  }

  function remove (string, node) {
    if (node.type === 'AssignmentExpression') {
      let prefix = commentify(`${node.left.getSource()} =`) + ' '
      // Anonymous function and class expressions are parsed as statements if they
      // are the first thing in a statement, which can happen if the `exports.xyz`
      // assignment happened inside a SequenceExpression (usually after minification).
      // eg: `exports.a=function(){},exports.b=function(){}`
      // Here if `exports.a` is removed we need to make sure the `function(){}` is still
      // an expression, by prepending `void 0,` to result in:
      // `void 0,function(){},exports.b=function(){}`
      // In the case of non-function/class expressions, we can void the whole thing
      // eg: `exports.a={},exports.b=''`
      // becomes: `void {},void ''`
      const isFunction = node.right.type === 'FunctionExpression'
      const isAssignment = node.right.type === 'AssignmentExpression'
      const isArrowFunction = node.right.type === 'ArrowFunctionExpression'
      const isVariableDeclarator = node.parent.parent.type === 'VariableDeclarator'
      if (
      // persist sequential variable declarations
      // eg: `var a = (0, exports.a = function(){})`
        (!isVariableDeclarator && node.parent.type === 'SequenceExpression') ||
          // without this, `exports.a = exports.b = xyz` eliminating exports.a becomes `void exports.b = xyz`
          // which is invalid.
          isAssignment ||
          // Don't output a statement containing only `void () => {}`
          isArrowFunction
      ) {
        // ignore alias assignment expression `exports.a = exports.b = exports.c`
        // unless the last argument is noname function
        const isAliasAssignment = isAssignment && node.right.left.type === 'MemberExpression' && node.right.left.object.name === 'exports'
        const isAliasFunction = isAliasAssignment && node.right.right.type === 'FunctionExpression'
        const isAliasClass = isAliasAssignment && node.right.right.type === 'ClassExpression'
        if (!isAliasAssignment || isAliasFunction || isAliasClass) {
          prefix += 'void '
          if (isAssignment || isArrowFunction || isFunction || isAliasFunction || isAliasClass) {
            prefix += '0, '
          }
        }
      } else if (
        // Make sure we can't accidentally continue a previous statement.
        // eg in `exports.a = [0]` the `[0]` could continue a previous statement if that
        // did not have a semicolon. By putting `void ` in front we force a new statement.
        node.parent.type === 'ExpressionStatement'
      ) {
        prefix += 'void '
      }

      // Acorn silently strips parens, and node.right.start might be after one
      // or more parenthesis that we need to keep. Eg, exports.a = (1+1)
      if (node.right.end !== node.end) {
        // Replace entire expression. node.start - node.end will wrap the entire expression.
        string.overwrite(node.start, node.end, prefix + '(' + node.right.getSource() + ')')
      } else {
        string.overwrite(node.start, node.right.start, prefix)
      }
      return
    } else if (node.type === 'Property') {
      // We may have to also overwrite a comma here, eg in `module.exports = {a, b, c}`
      // where `a` and `b` are unused. Else we would end up with `{,, c}`.
      const match = string.original.slice(node.end).match(/^\s*,/)
      if (match) {
        string.overwrite(node.start, node.end + match[0].length, commentify(node.getSource()))
        return
      }
    }
    node.edit.update(commentify(node.getSource()))
  }

  function commentify (str) {
    return wrapComment(`common-shake removed: ${str}`)
  }

  function addDuplicate (row, dupe) {
    if (!duplicates.has(row)) {
      duplicates.set(row, [dupe])
    } else {
      duplicates.get(row).push(dupe)
    }
  }
  function getDuplicates (row) {
    return duplicates.get(row) || []
  }
}
