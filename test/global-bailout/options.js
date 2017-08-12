module.exports = (t) => {
  t.plan(2)
  return {
    onGlobalBailout () {
      t.pass('bailed out')
    }
  }
}
