# common-shakeify

browserify tree shaking plugin using [@indutny](https://github.com/indutny)'s [common-shake](https://github.com/indutny/common-shake)

Comments out unused exports from CommonJS modules.

With input files:

```js
// math.js
exports.min = function (a, b) { return a < b ? a : b }
exports.max = function (a, b) { return a < b ? b : a }

// app.js
var math = require('./math')
console.log(math.max(10, 20))
```

This plugin will rewrite the files to:

```js
// math.js
/* common-shake removed: exports.min = */ void function (a, b) { return a < b ? a : b }
exports.max = function (a, b) { return a < b ? b : a }

// app.js
var math = require('./math')
console.log(math.max(10, 20))
```

Use a minifier on the output to remove the exports entirely.

## Install

```bash
npm install --save-dev common-shakeify
```

## Usage

With the browserify cli:

```bash
browserify -p common-shakeify /my/app.js > bundle.js
# Minify
uglify-js bundle.js --compress > bundle.min.js
```

With the browserify Node API:

```js
var commonShake = require('common-shakeify')

var b = browserify({ entries: '/my/app.js' })
  .plugin(commonShake, { /* options */ })
  .bundle()

// Minify & save
var uglify = require('minify-stream')
b
  .pipe(uglify())
  .pipe(fs.createWriteStream('bundle.min.js'))
```

Note that using a minifier transform like uglifyify doesn't eliminate the commented-out exports.
Transforms run _before_ common-shakeify, so you have to use a minifier on the final bundle to remove the unused exports.

## Options

### `verbose`, `v`

When true, print messages to stderr when exports are deleted, or the tree-shaker bails out on a module.
Default false.
The `verbose` flag only works when no custom handlers are passed, so if you're using eg. a custom `onExportDelete` you have to print these messages manually.

```bash
$ browserify -p [ common-shakeify -v ] app.js > bundle.js
common-shake: removed `decode` in node_modules/vlq/dist/vlq.js:10:7
common-shake: bailed out: `module.exports` assignment in node_modules/process-nextick-args/index.js:20:3
```

### `onExportDelete(filename, exportName)`

Handler called for every exported identifier that is being removed.
`filename` is the path to the file that exports the identifier. `exportName` is the name of the identifier. Return false to bail and keep the identifier.

### `onModuleBailout(module, reasons)`

Handler called when a module cannot be tree-shaked for some reason.
`module` is the [Module object from common-shake](https://github.com/indutny/common-shake/blob/master/lib/shake/module.js).
`reasons` is an array of reasons that caused this module to be deoptimised.

### `onGlobalBailout(reasons)`

Handler called when tree-shaking is skipped entirely, usually because there is a dynamic `require` call in the source.
`reasons` is an array of reasons for skipping tree-shaking.

## License

[MIT](./LICENSE)
