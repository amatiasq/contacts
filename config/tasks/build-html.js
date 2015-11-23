/* eslint-env node */
var gulp = require('gulp');
var htmlreplace = require('gulp-html-replace');
var timestamp = require('./timestamp');


gulp.task('build:html', function() {
  return gulp.src('./src/index.html')
    .pipe(htmlreplace({
      css: '/out.' + timestamp + '.css',
      js: '/out.' + timestamp + '.js',
    }))
    .pipe(gulp.dest('./dist'));
});
