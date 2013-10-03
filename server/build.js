'use strict';
var browserify = require('browserify');

var go = module.exports = function () {
  return browserify()
    .require(require.resolve('../client/main'), { entry: true })
    .bundle({ debug: true });
};
