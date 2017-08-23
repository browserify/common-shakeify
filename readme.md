# common-shakeify

browserify tree shaking plugin using [@indutny](https://github.com/indutny)'s [common-shake](https://github.com/indutny/common-shake)

## Install

```bash
npm install --save-dev common-shakeify
```

## Usage

With the browserify cli:

```bash
browserify -p common-shakeify /my/app.js
```

With the browserify Node API:

```js
var commonShake = require('common-shakeify')

browserify({ entries: '/my/app.js' })
  .plugin(commonShake, { /* options */ })
  .bundle()
```

## Options

### `verbose`, `v`

When true, print messages to stderr when exports are deleted, or the tree-shaker bails out on a module.
Default false.
The `verbose` flag only works when no custom handlers are passed, so if you're using eg. a custom `onExportDelete` you have to print these messages manually.

```bash
$ browserify -p [ common-shakeify -v ] app.js > bundle.js
common-shake: removed `decode` in node_modules/vlq/dist/vlq.js
common-shake: `module.exports` assignment in node_modules/process-nextick-args/index.js
```

### `onExportDelete(filename, exportName)`

Handler called for every exported identifier that is being removed.
`filename` is the path to the file that exports the identifier. `exportName` is the name of the identifier.

### `onModuleBailout(module, reasons)`

Handler called when a module cannot be tree-shaked for some reason.
`module` is the [Module object from common-shake](https://github.com/indutny/common-shake/blob/master/lib/shake/module.js).
`reasons` is an array of reasons that caused this module to be deoptimised.

### `onGlobalBailout(reasons)`

Handler called when tree-shaking is skipped entirely, usually because there is a dynamic `require` call in the source.
`reasons` is an array of reasons for skipping tree-shaking.

## License

[MIT](./LICENSE)
