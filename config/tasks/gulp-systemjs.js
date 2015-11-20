/* globals module, require, Buffer */

var gutil = require('gulp-util');
var through = require('through2');
var Builder = require('systemjs-builder');


module.exports = gulpSystemJS;
gulpSystemJS.debug = debug;


function gulpSystemJS(config, module) {
  var stream = through.obj(function(file, enc, callback) {
    this.push(file);
    callback();
  });

  new Builder(config).buildStatic(module).then(function(output) {
    var source = output.source;
    var file = new gutil.File({
      cwd: '',
      base: '',
      path: module,
      contents: source instanceof Buffer ? source : new Buffer(source),
    });

    stream.write(file);
    stream.end();
  });

  return stream;
}

function debug(config, module) {
  var _ = require('lodash');
  return new Builder(config).trace(module).then(function(trace) {
    console.log(JSON.stringify(Object.keys(trace).map(function(key) {
      return _.extend(
        _.pick(trace[key], 'name', 'normalized', 'deps'),
        { format: trace[key].metadata.format }
      );
    }), null, '  '));
  });
}

