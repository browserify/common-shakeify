(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0ZXN0L3NvdXJjZS1tYXAvYXBwLmpzIiwidGVzdC9zb3VyY2UtbWFwL2RlcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBSSxNQUNGLFFBQVEsT0FBUixFQUFpQixDQURuQjs7QUFHQSxRQUFRLEdBQVIsQ0FDRSxHQURGOzs7Ozs7OztBQ0hPLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFNLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFWLENBQUE7QUFDQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBTSxDQUFBLENBQUEsQ0FBQSxDQUFBLHdDQUFJLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBVixDQUFBOztBQUVQLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFTLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFULENBQUEsQ0FBQSxDQUFzQixDQUFBO0FBQ3BCLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFPLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBUCxDQUFBO0FBQ0QsQ0FBQTs7QUFFRCxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBTSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQU4sQ0FBQTs7QUFFQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBUyxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQVQsQ0FBQSxDQUFBLENBQXFCLENBQUE7QUFDbkIsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQU8sQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFQLENBQUE7QUFDRCxDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciB2YWwgPVxuICByZXF1aXJlKCcuL2RlcCcpLmFcblxuY29uc29sZS5sb2coXG4gIHZhbFxuKVxuIiwiZXhwb3J0IGNvbnN0IGEgPSBzb21ldGhpbmcoKVxuZXhwb3J0IGNvbnN0IGIgPSB3aGF0ZXZlclxuXG5mdW5jdGlvbiBzb21ldGhpbmcgKCkge1xuICByZXR1cm4gJ2FiYydcbn1cblxudGhyb3cgJ3NvbWV0aGluZydcblxuZnVuY3Rpb24gd2hhdGV2ZXIgKCkge1xuICByZXR1cm4gJ3h5eidcbn1cbiJdfQ==
