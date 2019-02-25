(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// This is roughly what Babel's ESM→CommonJS module transform does.
exports.a = /* common-shake removed: exports.b = */ /* common-shake removed: exports.c = */ /* common-shake removed: exports.d = */ null

exports.a = 'a'
/* common-shake removed: exports.b = */ void 'b'

/* common-shake removed: exports.c = */ void 0, /* common-shake removed: exports.d = */ function () {}

/* common-shake removed: exports.e = */ /* common-shake removed: exports.f = */ void 0, () => {}
/* common-shake removed: exports.g = */ void 0, /* common-shake removed: exports.h = */ class {}

// should not leak
/* common-shake removed: exports.i = */ void 0, /* common-shake removed: exports.j = */ class named {}
/* common-shake removed: exports.k = */ void 0, /* common-shake removed: exports.l = */ function named3 () {}

},{}],2:[function(require,module,exports){
console.log(require('./a').a)

},{"./a":1}]},{},[2]);
