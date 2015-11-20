/* globals exports */
exports.translate = function(load) {
  return 'module.exports = ' + load.source;
};
