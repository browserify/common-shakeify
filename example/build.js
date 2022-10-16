const path = require('path')
const browserify = require('browserify')
const commonShake = require('../')

const b = browserify({ entries: path.join(__dirname, 'app.js') })
  .plugin(commonShake, {
    verbose: true
  })
  .bundle()

// Minify & save
const fs = require('fs')
const concat = require('concat-stream')
const uglify = require('uglify-js')
b.pipe(concat(function (source) {
  const minified = uglify.minify(source.toString('utf8'), {
    mangle: false,
    compress: true
  })
  fs.writeFileSync(path.join(__dirname, 'bundle.min.js'), minified.code)
}))
