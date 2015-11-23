/* eslint-env node */
var gulp = require('gulp');
var rename = require('gulp-rename');
var timestamp = require('./timestamp');
var systemjs = require('./gulp-systemjs');
var conf = require('../../src/conf.json');

gulp.task('build:js', function() {
  return systemjs(conf, 'src/app/app.js')
    .pipe(rename('out.' + timestamp + '.js'))
    .pipe(gulp.dest('./dist'));
});
