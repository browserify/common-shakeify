# common-shakeify

browserify tree shaking plugin using @indutny's [common-shake](https://github.com/indutny/common-shake)

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

With the Node API, some options can be passed:

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
