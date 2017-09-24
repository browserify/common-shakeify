'use strict'
const relative = require('path').relative
const Analyzer = require('common-shake').Analyzer
const transformAst = require('transform-ast')
const wrapComment = require('wrap-comment')
const through = require('through2')

const kDuplicates = Symbol('duplicates')

module.exports = function commonShake (b, opts) {
  if (typeof b !== 'object') {
    throw new Error('common-shakeify: must be used as a plugin, not a transform')
  }

  const basedir = b._options.basedir || process.cwd()
  const seen = {}
  opts = Object.assign({
    verbose: false,
    onExportDelete (path, name) {
      if (opts.verbose || opts.v) {
        console.warn('common-shake: removed', `\`${name}\``, 'in', relative(basedir, path))
      }
    },
    onModuleBailout (resource, reasons) {
      if (opts.verbose || opts.v) {
        reasons.forEach((reason) => {
          if (seen[resource.resource + reason.reason]) return
          seen[resource.resource + reason.reason] = true
          const loc = reason.loc.start
          console.warn('common-shake: bailed out: ', reason.reason, 'in', `${relative(basedir, resource.resource)}:${loc.line}:${loc.column}`)
        })
      }
    },
    onGlobalBailout (reasons) {
      if (opts.verbose || opts.v) {
        reasons.forEach((reason) => {
          const loc = reason.loc.start
          console.warn('common-shake: GLOBAL BAILOUT:', reason.reason, 'in', `${relative(basedir, resource.resource)}:${loc.line}:${loc.column}`)
        })
      }
    }
  }, opts)

  const analyzer = new Analyzer()

  b.pipeline.get('label').unshift(through.obj(onfile, onend))

  const rows = new Map()
  const strings = new Map()

  function onfile (row, enc, next) {
    const file = row.id
    let source = row.source

    if (row.dedupe) {
      // For modules that were deduped, attach the duplicates to the original row,
      // and pass the original source to the analyzer.
      // Later on, we'll merge the used declarations together, so everything still
      // works if dependencies of different copies of the deduped module use
      // different parts of that module.
      const deduped = rows.get(row.dedupe) || rows.get(row.dedupeIndex)
      if (deduped) {
        addDuplicate(deduped, row)
        source = deduped.source
      } else {
        return next(new Error(`Could not redupe module ${row.file}`))
      }
    }

    let ast
    const string = transformAst(source, { locations: true }, (node) => {
      if (node.type === 'Program') ast = node
    })
    analyzer.run(ast, file)

    Object.keys(row.deps).forEach((name) => {
      analyzer.resolve(file, name, row.deps[name])
    })

    if (row.entry) {
      analyzer.getModule(file).forceExport()
    }

    rows.set(file, row)
    strings.set(file, string)

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
        this.push(row)
        return
      }

      if (module.bailouts) {
        opts.onModuleBailout(module, module.bailouts)
        this.push(row)
        return
      }

      module.getDeclarations().forEach((decl) => {
        if (!isUsed(decl.name)) {
          opts.onExportDelete(row.sourceFile || row.file, decl.name)
          remove(string, decl.ast)
        }
      })

      row.source = string.toString()

      this.push(row)

      // Check if a name was used in this module, or
      // in any of this module's deduped versions.
      function isUsed (name) {
        if (module.isUsed(name)) {
          return true
        }
        if (dupes.length > 0) {
          return dupes.some((dupe) => {
            const m = analyzer.modules.get(dupe.file)
            return m && m.isUsed(name)
          })
        }
        return false
      }
    })

    next()
  }

  function remove (string, node) {
    if (node.type === 'AssignmentExpression') {
      var prefix = commentify(`${node.left.getSource()} =`) + ' '
      // Make sure we can't accidentally continue a previous statement.
      // eg in `exports.a = [0]` the `[0]` could continue a previous statement if that
      // did not have a semicolon. By putting `void ` in front we force a new statement.
      if (node.parent.type === 'ExpressionStatement') {
        prefix += 'void '
      }
      // Anonymous function and class expressions are parsed as statements if they
      // are the first thing in a statement, which can happen if the `exports.xyz`
      // assignment happened inside a SequenceExpression (usually after minification).
      // eg: `exports.a=function(){},exports.b=function(){}`
      // Here if `exports.a` is removed we need to make sure the `function(){}` is still
      // an expression, by prepending `void 0,` to result in:
      // `void 0,function(){},exports.b=function(){}`
      var isPossiblyAmbiguousExpression = node.right.type === 'FunctionExpression' || node.right.type === 'ClassExpression'
      if (isPossiblyAmbiguousExpression && node.parent.type === 'SequenceExpression') {
        prefix += 'void 0, '
      }
      string.overwrite(node.start, node.right.start, prefix)
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
}

function addDuplicate (row, dupe) {
  if (!row[kDuplicates]) {
    row[kDuplicates] = []
  }
  row[kDuplicates].push(dupe)
}
function getDuplicates (row) {
  return row[kDuplicates] || []
}
