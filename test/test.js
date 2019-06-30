var test = require('tape')
var assert = require('assert')
var fs = require('fs')
var path = require('path')
var browserify = require('browserify')
var concat = require('concat-stream')
var commonShake = require('../')

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
      result.toString('utf8').replace(/\r\n/g, '\n'),
      fs.readFileSync(expected, 'utf8').replace(/\r\n/g, '\n'),
      name
    )
    t.end()
  }))
}

test('comment', function (t) {
  runTest(t, 'comment')
})
test('dedupe', function (t) {
  runTest(t, 'dedupe')
})
test('export-delete', function (t) {
  runTest(t, 'export-delete')
})
test('funny-exports', function (t) {
  runTest(t, 'funny-exports')
})
test('global-bailout', function (t) {
  runTest(t, 'global-bailout')
})
test('module-bailout', function (t) {
  runTest(t, 'module-bailout')
})
test('module-exports', function (t) {
  runTest(t, 'module-exports')
})
test('multiple-assign', function (t) {
  runTest(t, 'multiple-assign')
})
test('semi', function (t) {
  runTest(t, 'semi')
})
test('simple', function (t) {
  runTest(t, 'simple')
})
test('exclude', function (t) {
  runTest(t, 'exclude')
})
test('paren-exports', function (t) {
  runTest(t, 'paren-exports')
})

test('external', function (t) {
  var b = browserify({
    entries: path.join(__dirname, 'external/app.js')
  })

  b.external('xyz')

  b.bundle(function (err, bundle) {
    t.ifError(err)
    t.end()
  })
})

test('source maps', function (t) {
  var b = browserify({
    entries: path.join(__dirname, 'source-map/app.js'),
    debug: true,
    preludePath: 'node_modules/browser-pack/_prelude.js'
  })
  b.transform('babelify', {
    plugins: [
      'transform-es2015-modules-commonjs'
    ]
  })
  b.plugin(commonShake)

  var bundle = b.bundle()
  bundle.on('error', t.fail)

  // Write actual output to a file for easier inspection
  bundle.pipe(fs.createWriteStream(
    path.join(__dirname, 'source-map/actual.js')
  ))

  bundle.pipe(concat(function (result) {
    t.is(
      result.toString('utf8'),
      fs.readFileSync(path.join(__dirname, 'source-map/expected.js'), 'utf8'),
      'source maps'
    )
    t.end()
  }))
})

test('dash-r', function (t) {
  var b = browserify({
    entries: path.join(__dirname, 'dash-r/app.js')
  })
  b.require(path.join(__dirname, 'dash-r/expose.js'), { expose: 'whatever' })
  b.plugin(commonShake)

  var bundle = b.bundle()
  bundle.on('error', t.fail)

  bundle.pipe(fs.createWriteStream(
    path.join(__dirname, 'dash-r/actual.js')
  ))

  bundle.pipe(concat(function (result) {
    t.is(
      result.toString('utf8'),
      fs.readFileSync(path.join(__dirname, 'dash-r/expected.js'), 'utf8'),
      'dash-r'
    )
    t.end()
  }))
})

test('dash-r node_modules', function (t) {
  var b = browserify({
    entries: path.join(__dirname, 'dash-r-node-modules/app.js')
  })
  b.require('net-browserify-stub', { expose: 'net' })
  b.plugin(commonShake)

  var bundle = b.bundle()
  bundle.on('error', t.fail)

  bundle.pipe(fs.createWriteStream(
    path.join(__dirname, 'dash-r-node-modules/actual.js')
  ))

  bundle.pipe(concat(function (result) {
    t.is(
      result.toString('utf8'),
      fs.readFileSync(path.join(__dirname, 'dash-r-node-modules/expected.js'), 'utf8'),
      'dash-r'
    )
    t.end()
  }))
})

// TODO fix this one
test('dash-r node_modules with full paths', { skip: true }, function (t) {
  var b = browserify({
    fullPaths: true,
    entries: path.join(__dirname, 'dash-r-node-modules/app.js')
  })
  b.require('net-browserify-stub', { expose: 'net' })
  b.plugin(commonShake)

  var bundle = b.bundle()
  bundle.on('error', t.fail)

  bundle.pipe(fs.createWriteStream(
    path.join(__dirname, 'dash-r-node-modules/actual-fullpaths.js')
  ))

  bundle.pipe(concat(function (result) {
    t.is(
      result.toString('utf8'),
      fs.readFileSync(path.join(__dirname, 'dash-r-node-modules/expected-fullpaths.js'), 'utf8'),
      'dash-r'
    )
    t.end()
  }))
})
