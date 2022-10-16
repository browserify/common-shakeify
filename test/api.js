const test = require('tape')
const path = require('path')
const browserify = require('browserify')
const commonShakeify = require('../')

const sampleEntry = path.join(__dirname, 'simple/app.js')

test('should work as a plugin', function (t) {
  try {
    browserify({ entries: sampleEntry })
      .plugin(commonShakeify)
    t.pass()
    t.end()
  } catch (err) {
    t.fail(err)
  }
})

test('should throw if not used as a plugin', function (t) {
  t.timeoutAfter(2000)

  browserify({ entries: sampleEntry })
    .transform(commonShakeify)
    .bundle()

  process.on('uncaughtException', function (err) {
    t.ok(/common-shakeify:/.test(err.message))
    t.end()
  })
})
