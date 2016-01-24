var gulp = require('gulp');
var babel = require('gulp-babel');
var del = require('del');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('scripts', function () {
    return gulp.src('src/*.js*')
        .pipe(babel())
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
    return del(['dist']);
});

gulp.task('app', ['scripts'], function () {
    var b = browserify({
        entries: './dist/client.js',
        debug: true
    });

    return b.bundle()
        .pipe(source('./dist/app.js'))  // output file name
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
            // Add transformation tasks to the pipeline here.
            //.pipe(uglify())
            //.on('error', gutil.log)
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('.'));
});

gulp.task('default', ['app']);
