(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('./funny').exports()

require('./funny').e

},{"./funny":2}],2:[function(require,module,exports){
exports.exports = function () {}

console.log(/* common-shake removed: exports.a = */ 'hello world')
function a() {} /* common-shake removed: exports.b = */ void 0, function () { return a }, console.log(a)
var c = (0, /* common-shake removed: exports.c = */ 'beep boop')

/* common-shake removed: exports.d = */ void 0, exports.e = null

},{}]},{},[1]);
