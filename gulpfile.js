/* eslint-disable */

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

const destFolder = 'Food-dev';

gulp.task('server', function() {

    browserSync.init({
        proxy: `${destFolder}`
    });

    gulp.watch("src/index.html").on('change', browserSync.reload);
    gulp.watch("src/js/bundle.js").on('change', browserSync.reload);
});

 
gulp.task('clean', function () {
    return gulp.src(`C:/Code/domains/${destFolder}`, {read: false})
        .pipe(clean({force: true}))
  });

gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(`C:/Code/domains/${destFolder}/css`))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("src/*.html").on('change', gulp.parallel('html'));
    gulp.watch("src/js/**/*").on('change', gulp.parallel('scripts'));
    gulp.watch("src/fonts/**/*").on('all', gulp.parallel('fonts'));
    gulp.watch("src/svg/**/*").on('all', gulp.parallel('svg'));
    gulp.watch("src/img/**/*").on('all', gulp.parallel('images'));
});

gulp.task('html', function () {
    return gulp.src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(`C:/Code/domains/${destFolder}/`));
});

gulp.task('scripts', function () {
    return gulp.src("src/js/bundle.+(*)")
        .pipe(gulp.dest(`C:/Code/domains/${destFolder}/js`))
});


gulp.task('fonts', function () {
    return gulp.src("src/fonts/**/*")
        .pipe(gulp.dest(`C:/Code/domains/${destFolder}/fonts`))
});

gulp.task('svg', function () {
    return gulp.src("src/svg/**/*")
        .pipe(gulp.dest(`C:/Code/domains/${destFolder}/svg`))
});

gulp.task('images', function () {
    return gulp.src("src/img/**/*")
        .pipe(gulp.dest(`C:/Code/domains/${destFolder}/img`))
});

gulp.task('default', gulp.series('clean', gulp.parallel('server', 'styles', 'watch', 'html', 'scripts', 'fonts', 'svg',  'images')));