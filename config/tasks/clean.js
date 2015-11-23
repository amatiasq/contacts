/* eslint-env node */
var gulp = require('gulp');
var clean = require('gulp-clean');


gulp.task('clean:js', remove('./dist/out.*.js'));
gulp.task('clean:css', remove('./dist/out.*.css'));
gulp.task('clean:html', remove('./dist/out.html'));
gulp.task('clean', remove('./dist'));


function remove(src) {
  return function() {
    return gulp.src(src).pipe(clean());
  };
}
