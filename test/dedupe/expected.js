(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
