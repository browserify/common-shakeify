var target = exports.target = 'world'
exports.getMessage = function () {
  return 'hello ' + target
}
exports.setTarget = function (newTarget) {
  target = newTarget
}
