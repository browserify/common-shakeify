var test = require('tape')
var assert = require('assert')
var fs = require('fs')
var path = require('path')
var browserify = require('browserify')
var concat = require('concat-stream')
var commonShake = require('../')

var tests = fs.readdirSync(__dirname).filter(function (name) {
  return fs.statSync(path.join(__dirname, name)).isDirectory() &&
    fs.existsSync(path.join(__dirname, name, 'app.js'))
})

tests.forEach(function (name) {
  test(name, function (t) {
    runTest(t, name)
  })
})

function runTest (t, name) {
  t.plan(1)
  var basedir = path.join(__dirname, name)
  var optionsPath = path.join(basedir, 'options.js')
  var options = {}
  try { options = require(optionsPath)(t) } catch (err) {}
  var entry = path.join(basedir, 'app.js')
  var expected = path.join(basedir, 'expected.js')
  var actual = path.join(basedir, 'actual.js')
  var bundle = browserify({ entries: entry })
    .plugin(commonShake, options)
    .bundle()
    .on('error', t.fail)

  // Write actual output to a file for easier inspection
  bundle.pipe(fs.createWriteStream(actual))

  bundle.pipe(concat(function (result) {
    t.is(
      result.toString('utf8'),
      fs.readFileSync(expected, 'utf8'),
      name
    )
    t.end()
  }))
}
