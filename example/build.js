var path = require('path')
var browserify = require('browserify')
var commonShake = require('../')

var b = browserify({ entries: path.join(__dirname, 'app.js') })
  .plugin(commonShake, {
    verbose: true
  })
  .bundle()

// Minify & save
var fs = require('fs')
var concat = require('concat-stream')
var uglify = require('uglify-js')
b.pipe(concat(function (source) {
  var minified = uglify.minify(source.toString('utf8'), {
    mangle: false,
    compress: true
  })
  fs.writeFileSync(path.join(__dirname, 'bundle.min.js'), minified.code)
}))
