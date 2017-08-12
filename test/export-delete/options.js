module.exports = (t) => {
  const deletes = [
    'y',
    'z',
    'lol'
  ]

  t.plan(4)

  return {
    onExportDelete (file, name) {
      t.equal(deletes.shift(), name)
    }
  }
}
