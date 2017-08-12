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
  .plugin(commonShake)
  .bundle()
```

## License

[MIT](./LICENSE)
