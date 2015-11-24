/* eslint-env node */

require('./config/tasks/lint');
require('./config/tasks/clean');
require('./config/tasks/build-js');
require('./config/tasks/build-css');
require('./config/tasks/build-html');

var gulp = require('gulp');
var runSequence = require('run-sequence');


    // , 'lint' ],
gulp.task('build', function(done) {
  runSequence(
    [ 'clean' ],
    [ 'build:css', 'build:js' ],
    'build:html',
    done
  );
});
