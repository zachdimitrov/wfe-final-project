const gulp = require('gulp');
const eslint = require('gulp-eslint');
const csslint = require('gulp-csslint');
const gulpsync = require('gulp-sync')(gulp);
const babel = require('gulp-babel');
const del = require('del');
const cssMin = require('gulp-css');
const smushit = require('gulp-smushit');
const nodemon = require('gulp-nodemon');

gulp.task('default', () => {});

// lint

gulp.task('lint:js', () => {
    return gulp.src(['src/**/*.js', '!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('lint:css', () => {
    return gulp.src('src/**/*.css')
        .pipe(csslint())
        .pipe(csslint.formatter());
});

gulp.task('lint', ['lint:js', 'lint:css']);

// clean

gulp.task('clean', () => {
    return del('build/');
});

// compile

gulp.task('compile:js', () => {
    return gulp.src(['src/**/*.js', '!node_modules/**', '!_design/'])
        .pipe(babel({
            presets: ['env'],
        }))
        .pipe(gulp.dest('build/'));
});

gulp.task('compile:css', () => {
    return gulp.src('src/**/*.css')
        .pipe(cssMin())
        .pipe(gulp.dest('build/'));
});

gulp.task('compile:img', () => {
    return gulp.src(['src/**/images/*', '!players/'])
        .pipe(smushit())
        .pipe(gulp.dest('build/'));
});

gulp.task('compile', ['compile:js', 'compile:css', 'compile:img']);

// copy

gulp.task('copy', () => {
    return gulp.src(['src/**/*.html', 'src/**/*.handlebars', 'src/**/*.ico'])
        .pipe(gulp.dest('build/'));
});

// build

gulp.task('build', gulpsync.sync(['clean', 'lint', 'compile', 'copy']));

// start

gulp.task('dev:start', () => {
    nodemon({
        script: 'src/server.js',
        ext: 'js html',
        env: { 'NODE_ENV': 'development' },
    });
});

gulp.task('prod:start', () => {
    nodemon({
        script: 'build/server.js',
        ext: 'js html',
        env: { 'NODE_ENV': 'production' },
    });
});

gulp.task('start', gulpsync.sync(['build', 'prod:start']));
