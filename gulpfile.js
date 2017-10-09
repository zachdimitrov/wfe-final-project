const gulp = require('gulp');
const eslint = require('gulp-eslint');
const csslint = require('gulp-csslint');
const gulpsync = require('gulp-sync')(gulp);
const babel = require('gulp-babel');
const del = require('del');
const cssMin = require('gulp-css');
const smushit = require('gulp-smushit');
const nodemon = require('gulp-nodemon');
// const exec = require('gulp-exec');

const buildPath = '../wfe-heroku-deploy/tennis-vissioned/build';

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
        .pipe(csslint('csslintrc.json'))
        .pipe(csslint.formatter('compact'));
});

gulp.task('lint', ['lint:js', 'lint:css']);

// clean

gulp.task('clean', () => {
    return del(buildPath, { force: true });
});

// compile

gulp.task('compile:js', () => {
    return gulp.src(['src/**/*.js', '!node_modules/**', '!_design/'])
        .pipe(babel({
            presets: ['env'],
        }))
        .pipe(gulp.dest(buildPath));
});

gulp.task('compile:css', () => {
    return gulp.src('src/**/*.css')
        .pipe(cssMin())
        .pipe(gulp.dest(buildPath));
});

gulp.task('compile:img', () => {
    return gulp.src(['src/**/images/*', '!players/'])
        .pipe(smushit())
        .pipe(gulp.dest(buildPath));
});

gulp.task('compile', ['compile:js', 'compile:css', 'compile:img']);

// copy

gulp.task('copy', () => {
    return gulp.src(['src/**/*.html', 'src/**/*.handlebars', 'src/**/*.ico'])
        .pipe(gulp.dest(buildPath));
});

// build

gulp.task('build', gulpsync.sync(['clean', 'lint', 'compile', 'copy']));

// start

gulp.task('dev', () => {
    nodemon({
        script: 'src/server.js',
        ext: 'js html',
        env: { 'NODE_ENV': 'development' },
    });
});

gulp.task('prod:start', () => {
    nodemon({
        script: buildPath + '/server.js',
        ext: 'js html',
        env: { 'NODE_ENV': 'production' },
    });
});

gulp.task('start', gulpsync.sync(['build', 'prod:start']));

// deploy just for test

// gulp.task('deploy', () => {
//     return gulp.src('./**/**')
//         .pipe(exec(`git add . &&
//             git commit -am "deploy version ${new Date().toString()}" &&
//             git push heroku master`))
//         .pipe(exec.reporter());
// });

// gulp.task('deploy', gulpsync.sync(['build', 'deploy']));
