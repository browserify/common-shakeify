exports.exports = function () {}
exports.other = () => { console.log('other') }

console.log(exports.a = 'hello world')
function a() {} exports.b = function () { return a }, console.log(a)
var c = (0, exports.c = 'beep boop')

exports.d = exports.e = null

exports.f = {},exports.g = 'g',exports.h = () => {},exports.i = function () {}
