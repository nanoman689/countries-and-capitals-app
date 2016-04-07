//inside of Gulpfile.js
var gulp = require('gulp');

var jshint = require('gulp-jshint');
var usemin = require('gulp-usemin');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');

var connect = require('gulp-connect');
gulp.task('connect', function() {
  connect.server();
});

gulp.task('copy-html-files', function() {
  gulp.src(['./app/**/*.html', '!./app/index.html'], {base: './app'})
  .pipe(gulp.dest('build/'));
});

gulp.task('usemin', function() {
  gulp.src('./app/index.html')
    .pipe(usemin({
      css: [minifyCss(), 'concat', rev()],
      js: [uglify(), rev()]
    }))
    .pipe(gulp.dest('build/'));
});

// JavaScript linting task
gulp.task('jshint', function() {
  return gulp.src('site/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Compile Sass task
gulp.task('sass', function() {
  return gulp.src('site/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('site/css'));
});

// Minify index
gulp.task('html', function() {
  return gulp.src('site/index.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('build/'));
});

// JavaScript build task, removes whitespace and concatenates all files
gulp.task('scripts', function() {
  return gulp.src('site/js/*.js')
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});

// Styles build task, concatenates all the files
gulp.task('styles', function() {
  return gulp.src('site/css/*.css')
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('build/css'));
});

// Image optimization task
gulp.task('images', function() {
  return gulp.src('site/img/*.jpg')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/img'));
});

// Watch task
gulp.task('watch', function() {
  gulp.watch('site/js/*.js', ['jshint']);
  gulp.watch('site/scss/*.scss', ['sass']);
});

// Default task
gulp.task('default', ['jshint', 'sass', 'watch']);

// Build task
gulp.task('build', ['copy-html-files', 'usemin', 'images']);
