const Analyzer = require('common-shake').Analyzer
const MagicString = require('magic-string')
const parse = require('acorn').parse
const through = require('through2')

module.exports = function commonShake (b, opts) {
  const analyzer = new Analyzer()

  b.pipeline.get('label').unshift(through.obj(onfile, onend))

  const rows = new Map()
  const strings = new Map()

  function onfile (row, enc, next) {
    const file = row.id
    const ast = parse(row.source, { locations: true })
    analyzer.run(ast, file)

    Object.keys(row.deps).forEach((name) => {
      analyzer.resolve(file, name, row.deps[name])
    })

    if (row.entry) {
      analyzer.getModule(file).forceExport()
    }

    rows.set(file, row)
    strings.set(file, new MagicString(row.source))

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
    const orig = string.slice(node.start, node.end)
    string.overwrite(node.start, node.end, '/* common-shake removed: ' + safeComment(orig) + ' */')
  }

  function safeComment (str) {
    return str.replace(/\*\//g, '*\/')
  }
}
