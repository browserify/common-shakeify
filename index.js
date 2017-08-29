'use strict'
const relative = require('path').relative
const Analyzer = require('common-shake').Analyzer
const transformAst = require('transform-ast')
const through = require('through2')

module.exports = function commonShake (b, opts) {
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
    let ast
    const string = transformAst(row.source, { locations: true }, (node) => {
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

      if (module.bailouts) {
        opts.onModuleBailout(module, module.bailouts)
        this.push(row)
        return
      }

      module.getDeclarations().forEach((decl) => {
        if (!module.isUsed(decl.name)) {
          opts.onExportDelete(row.sourceFile || row.file, decl.name)
          remove(string, decl.ast)
        }
      })

      row.source = string.toString()
      this.push(row)
    })

    next()
  }

  function remove (string, node) {
    if (node.type === 'AssignmentExpression') {
      string.overwrite(node.start, node.right.start,
        commentify(`${node.left.getSource()} =`) +
        // Make sure we can't accidentally continue a previous statement.
        // eg in `exports.a = [0]` the `[0]` could continue a previous statement if that
        // did not have a semicolon. By putting `void ` in front we force a new statement.
        (node.parent.type === 'ExpressionStatement' ? ' void ' : ' ')
      )
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
    return `/* common-shake removed: ${safeComment(str)} */`
  }

  function safeComment (str) {
    return str.replace(/\*\//g, '*\\/')
  }
}
