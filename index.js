const Analyzer = require('common-shake').Analyzer
const transformAst = require('transform-ast')
const through = require('through2')

module.exports = function commonShake (b, opts) {
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
    analyzer.modules.forEach((module, key) => {
      const string = strings.get(key)
      const row = rows.get(key)
      module.getDeclarations().forEach((decl) => {
        if (!module.isUsed(decl.name)) {
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
        `/* common-shake removed: ${safeComment(node.left.getSource())} = */ ` +
        // Make sure we can't accidentally continue a previous statement.
        // eg in `exports.a = [0]` the `[0]` could continue a previous statement if that
        // did not have a semicolon. By putting `void ` in front we force a new statement.
        (node.parent.type === 'ExpressionStatement' ? 'void ' : '')
      )
    } else {
      node.edit.update(`/* common-shake removed: ${safeComment(node.getSource())} */`)
    }
  }

  function safeComment (str) {
    return str.replace(/\*\//g, '*\/')
  }
}
