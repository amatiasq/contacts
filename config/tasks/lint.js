/* eslint-env node */
var gulp = require('gulp');
var eslint = require('gulp-eslint');


gulp.task('lint:src', lint([
  './src/**/*.js',
  '!./src/**/*.min.js',
]));

gulp.task('lint:config', lint([
  './config/**/*.js',
  './*.js',
]));

gulp.task('lint', [
  'lint:config',
  'lint:src',
]);


function lint(files) {
  return function() {
    return gulp.src(files)
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failOnError());
  };
}
