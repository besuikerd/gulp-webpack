var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', function(callback){
    runSequence(
      ['lint', 'clean'],
      'webpack:build',
      callback
    );
});


gulp.task('build-dev', function(callback){
    runSequence(
      ['clean'],
      'webpack:build-dev',
      callback
    );
});