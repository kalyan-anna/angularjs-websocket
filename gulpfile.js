var gulp = require('gulp');

var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var clean = require('gulp-clean');
var gutil = require('gulp-util');
var browserSync = require('browser-sync').create();

gulp.task('lint', function() {
    gulp.src(['./app/**/*.js', '!./app/bower_components/**'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('watch', function () {
    gulp.watch('./app/**/*.html', ['refresh']);
});

gulp.task('refresh', function(){
    gutil.log("reloading app...");

    gulp.src(".app/index.html")
        .pipe(browserSync.reload());

   // browserSync.reload({stream:true});
});

gulp.task('serve', function() {
    var files = [
        './app/**/*.html'
    ];
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

// gulp.task('connect', function () {
//     connect.server({
//         root: 'app/',
//         port: 8888,
//         livereload: true
//     });
// });

gulp.task('default',
    ['start']
);

gulp.task('start', ['lint', 'serve', 'watch']);