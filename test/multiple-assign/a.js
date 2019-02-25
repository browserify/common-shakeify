// This is roughly what Babel's ESM→CommonJS module transform does.
exports.a = exports.b = exports.c = exports.d = null

exports.a = 'a'
exports.b = 'b'

exports.c = exports.d = function () {}

exports.e = exports.f = () => {}
exports.g = exports.h = class {}

// should not leak
exports.i = exports.j = class named {}
exports.k = exports.l = function named3 () {}
