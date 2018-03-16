(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0ZXN0L3NvdXJjZS1tYXAvYXBwLmpzIiwidGVzdC9zb3VyY2UtbWFwL2RlcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBSSxHQUFBLEdBQ0YsT0FBQSxDQUFRLE9BQVIsQ0FBQSxDQUFpQixDQURuQixDQUFBOztBQUdBLE9BQUEsQ0FBUSxHQUFSLENBQ0UsR0FERixDQUFBLENBQUE7Ozs7Ozs7O0FDSE8sTUFBTSxDQUFBLEdBQUEsT0FBQSxDQUFBLENBQUEsR0FBSSxTQUFBLEVBQVYsQ0FBQTtBQUNBLE1BQU0sQ0FBQSxHQUFBLHdDQUFJLFFBQVYsQ0FBQTs7QUFFUCxTQUFTLFNBQVQsR0FBc0I7RUFDcEIsT0FBTyxLQUFQLENBQUE7Q0FDRDs7QUFFRCxNQUFNLFdBQU4sQ0FBQTs7QUFFQSxTQUFTLFFBQVQsR0FBcUI7RUFDbkIsT0FBTyxLQUFQLENBQUE7Q0FDRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9cmV0dXJuIGV9KSgpIiwidmFyIHZhbCA9XG4gIHJlcXVpcmUoJy4vZGVwJykuYVxuXG5jb25zb2xlLmxvZyhcbiAgdmFsXG4pXG4iLCJleHBvcnQgY29uc3QgYSA9IHNvbWV0aGluZygpXG5leHBvcnQgY29uc3QgYiA9IHdoYXRldmVyXG5cbmZ1bmN0aW9uIHNvbWV0aGluZyAoKSB7XG4gIHJldHVybiAnYWJjJ1xufVxuXG50aHJvdyAnc29tZXRoaW5nJ1xuXG5mdW5jdGlvbiB3aGF0ZXZlciAoKSB7XG4gIHJldHVybiAneHl6J1xufVxuIl19
