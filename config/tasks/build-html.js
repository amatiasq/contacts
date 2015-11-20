/* eslint-env node */
var gulp = require('gulp');
var htmlreplace = require('gulp-html-replace');


gulp.task('build:html', function() {
  return gulp.src('./src/index.html')
    .pipe(htmlreplace({
      css: '/out.css',
      js: '/out.js',
    }))
    .pipe(gulp.dest('./dist'));
});
