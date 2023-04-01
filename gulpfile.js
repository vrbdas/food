/* eslint-disable */

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', function() {
    return gulp.src("src/scss/**/*.+(scss|sass)")
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest(`C:/program files/ospanel/domains/Food/css`))
});

gulp.task('watch', function() {
    gulp.watch("src/scss/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("src/*.html").on('change', gulp.parallel('html'));
    gulp.watch("src/js/**/*").on('change', gulp.parallel('scripts'));
    gulp.watch("src/fonts/**/*").on('all', gulp.parallel('fonts'));
    gulp.watch("src/php/**/*").on('change', gulp.parallel('php'));
    gulp.watch("src/icons/**/*").on('all', gulp.parallel('icons'));
    gulp.watch("src/img/**/*").on('all', gulp.parallel('images'));
});

gulp.task('html', function () {
    return gulp.src("src/*.html")
        .pipe(gulp.dest("C:/program files/ospanel/domains/Food/"));
});

gulp.task('scripts', function () {
    return gulp.src("src/js/**/*")
        .pipe(gulp.dest("C:/program files/ospanel/domains/Food/js"))
});

gulp.task('fonts', function () {
    return gulp.src("src/fonts/**/*")
        .pipe(gulp.dest("C:/program files/ospanel/domains/Food/fonts"))
});

gulp.task('php', function () {
    return gulp.src("src/php/**/*.php")
        .pipe(gulp.dest("C:/program files/ospanel/domains/Food/php"))
});

gulp.task('icons', function () {
    return gulp.src("src/icons/**/*")
        .pipe(gulp.dest("C:/program files/ospanel/domains/Food/icons"))
});

gulp.task('images', function () {
    return gulp.src("src/img/**/*")
        .pipe(gulp.dest("C:/program files/ospanel/domains/Food/img"))
});

gulp.task('default', gulp.parallel('styles', 'watch', 'html', 'scripts', 'fonts', 'php', 'icons',  'images'));