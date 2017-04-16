var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('run-server', function() {
  connect.server({
    root: 'frontend',
    livereload: true,
    port:80
  });
});

gulp.task('serve', ['run-server']);