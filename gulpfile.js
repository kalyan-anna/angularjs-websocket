var gulp = require('gulp');

var jshint = require('gulp-jshint');
var browserSync = require('browser-sync').create();

var config = {
    filesToWatch : [
        '!./app/bower_components/**',
        './app/**/*.html',
        './app/*.html',
        './app/**/*.js',
        './app/*.js',
        './app/**/*.css',
        './app/*.css',
    ]
};
gulp.task('lint', function() {
    gulp.src(['./app/**/*.js', './app/*.js', '!./app/bower_components/**'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('watch', function () {
    gulp.watch(config.filesToWatch, ['reloadApp']);
});

gulp.task('reloadApp', function(){
   browserSync.reload(".app/index.html");
});

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "app/"
        },
        injectChanges: true,
        port: 8888,
        open: true,
        notify: true
    });
});

gulp.task('default',
    ['start']
);

gulp.task('start', ['lint', 'serve', 'watch']);