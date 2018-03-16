(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
// whatever
exports.whatever = require('./whatever')
exports.something = function () {}

},{"./whatever":2}],2:[function(require,module,exports){
exports.message = 'whatever a'
exports.lol = function () {}

},{}],3:[function(require,module,exports){
var a = require('./a')
var b = require('./b')

a.something()
b.whatever()

},{"./a":1,"./b":4}],4:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"./whatever":5,"dup":1}],5:[function(require,module,exports){
exports.message = 'whatever b'
exports.do = function () {}

},{}]},{},[3]);
