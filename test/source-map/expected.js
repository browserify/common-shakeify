(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var val = require('./dep').a;

console.log(val);

},{"./dep":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const a = exports.a = something();
const b = /* common-shake removed: exports.b = */ whatever;

function something() {
  return 'abc';
}

throw 'something';

function whatever() {
  return 'xyz';
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0ZXN0L3NvdXJjZS1tYXAvYXBwLmpzIiwidGVzdC9zb3VyY2UtbWFwL2RlcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBSSxHQUFBLEdBQ0YsT0FBQSxDQUFRLE9BQVIsQ0FBQSxDQUFpQixDQURuQixDQUFBOztBQUdBLE9BQUEsQ0FBUSxHQUFSLENBQ0UsR0FERixDQUFBLENBQUE7Ozs7Ozs7O0FDSE8sTUFBTSxDQUFBLEdBQUEsT0FBQSxDQUFBLENBQUEsR0FBSSxTQUFBLEVBQVYsQ0FBQTtBQUNBLE1BQU0sQ0FBQSxHQUFBLHdDQUFJLFFBQVYsQ0FBQTs7QUFFUCxTQUFTLFNBQVQsR0FBc0I7RUFDcEIsT0FBTyxLQUFQLENBQUE7Q0FDRDs7QUFFRCxNQUFNLFdBQU4sQ0FBQTs7QUFFQSxTQUFTLFFBQVQsR0FBcUI7RUFDbkIsT0FBTyxLQUFQLENBQUE7Q0FDRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsInZhciB2YWwgPVxuICByZXF1aXJlKCcuL2RlcCcpLmFcblxuY29uc29sZS5sb2coXG4gIHZhbFxuKVxuIiwiZXhwb3J0IGNvbnN0IGEgPSBzb21ldGhpbmcoKVxuZXhwb3J0IGNvbnN0IGIgPSB3aGF0ZXZlclxuXG5mdW5jdGlvbiBzb21ldGhpbmcgKCkge1xuICByZXR1cm4gJ2FiYydcbn1cblxudGhyb3cgJ3NvbWV0aGluZydcblxuZnVuY3Rpb24gd2hhdGV2ZXIgKCkge1xuICByZXR1cm4gJ3h5eidcbn1cbiJdfQ==
