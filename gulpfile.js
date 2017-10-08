const gulp = require('gulp');
const eslint = require('gulp-eslint');
const csslint = require('gulp-csslint');
// const gulpsync = require('gulp-sync')(gulp);
const babel = require('gulp-babel');
// const nodemon = require('gulp-nodemon');
const clean = require('gulp-clean');

gulp.task('default', () => {});

// lint

gulp.task('lint', ['lint:js', 'lint:css']);

gulp.task('lint:js', () => {
    return gulp.src(['**/*.js', '!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('lint:css', () => {
    return gulp.src('static/css/*.css')
        .pipe(csslint())
        .pipe(csslint.formatter());
});

// build

gulp.task('build', ['clean', 'lint', 'compile']);

gulp.task('clean', () => {
    return gulp.src('build', { read: false })
        .pipe(clean());
});

gulp.task('compile', ['compile:js']);

gulp.task('compile:js', () => {
    gulp.src(['**/*.js', '!node_modules/**', '!_design/'])
        .pipe(babel({
            presets: ['env'],
        }))
        .pipe(gulp.dest('build'));
});

// start

gulp.task('server:start', () => {
    return require('./server');
});
