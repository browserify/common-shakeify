var test = require('tape')
var path = require('path')
var browserify = require('browserify')
var commonShakeify = require('../')

var sampleEntry = path.join(__dirname, 'simple/app.js')

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
