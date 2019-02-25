# common-shakeify change log

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

## 0.5.4
* Fix export bug with anonymous functions in assignment chains. ([@dy](https://github.com/dy) in [#25](https://github.com/browserify/common-shakeify/pull/25))
* Fix export bug with anonymous classes in assignment chains. ([#27](https://github.com/browserify/common-shakeify/pull/27))
* Fix scope bug with function/class expressions in assignment chains. ([#27](https://github.com/browserify/common-shakeify/pull/27))

## 0.5.3
* Fix export bug with assignment chains. ([@dy](https://github.com/dy) in [#23](https://github.com/browserify/common-shakeify/pull/23))

## 0.5.2
* Fix removing exports that are parenthesized expressions. ([@josephg](https://github.com/josephg) in [#20](https://github.com/browserify/common-shakeify/pull/20))

## 0.5.1
* Fix file names in source maps. ([@pirxpilot](https://github.com/pirxpilot) in [#16](https://github.com/browserify/common-shakeify/pull/16))

## 0.5.0
* Switch to `@goto-bus-stop/common-shake`, which supports dependent use tracking. ([#14](https://github.com/browserify/common-shakeify/pull/14))
