module.exports = (t) => {
  t.plan(3)

  return {
    // Should bail out twice.
    onModuleBailout (module, bailouts) {
      t.pass('bailed out')
    }
  }
}
