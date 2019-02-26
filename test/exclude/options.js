module.exports = (t) => {
  return {
    onExportDelete (file, name) {
      if (name === 'b') return false
    }
  }
}
