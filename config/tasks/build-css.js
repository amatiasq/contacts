/* eslint-env node */
var path = require('path');
var gulp = require('gulp');
var less = require('gulp-less');
var rename = require('gulp-rename');


gulp.task('build:css', function() {
  return gulp.src('./src/app/styles.less')
    .pipe(less({ paths: [ path.resolve(__dirname, '..') ]}))
    .pipe(rename('out.css'))
    .pipe(gulp.dest('./dist'));
});
