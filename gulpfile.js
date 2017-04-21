var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssc = require('gulp-css-condense');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("source/sass/*.sass", ['sass']);
    gulp.watch("**/*.html").on('change', browserSync.reload);
    gulp.watch("**/*.css").on('change', browserSync.reload);
    gulp.watch("**/*.js").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("source/sass/*.sass")
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 4 version'],
            cascade: false
        }))
        .pipe(gulp.dest("assets/css"))
        .pipe(browserSync.stream());
});

gulp.task('condense', function() {
    return gulp.src('assets/css/style.css')
        .pipe(cssc({
            consolidateViaDeclarations: true,
            consolidateViaSelectors: false,
            consolidateMediaQueries: true
        }))
        .pipe(gulp.dest('assets/css'));
});

gulp.task('default', ['serve']);
