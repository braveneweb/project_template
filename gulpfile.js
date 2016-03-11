//Initialization Plugins
var gulp = require('gulp');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');
var htmlv = require('gulp-html-validator');
var sass = require('gulp-sass');
var uncss = require('gulp-uncss');
var cmq = require('gulp-combine-mq');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-minify-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');



//HTML task
gulp.task('html', function () {
  gulp.src('*.html')
  .pipe(htmlv())
  .pipe(connect.reload())
});

//Compile SCSS files
gulp.task('styles', function() {
	gulp.src('scss/style.scss')
	.pipe(sass())
  .pipe(uncss({
    html: ['index.html', '/*.html', 'http://example.com']
  }))
  .pipe(cmq())
	.pipe(autoprefixer({
		browsers: ['last 3 version', 'ie 10']
	}))
	.pipe(minify())
	.pipe(gulp.dest('css'))
	.pipe(connect.reload())
});


//Concat and minify JS files
gulp.task('js', function() {
	gulp.src(['js/**/*.js'])
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js'))
		.pipe(connect.reload())
});


//Compress Images
gulp.task('images', function() {
	gulp.src('img/**/*')
    .pipe(imagemin({
      progressive: true,
      optimizationLevel: 5
    }))
    .pipe(gulp.dest('img'))
		.pipe(connect.reload())
});



// Server
gulp.task('connect', function() {
  connect.server({
    livereload: true
  });
});



//Watch task
gulp.task('watch', function() {
    gulp.watch('*.html', ['html']);
    gulp.watch('scss/**/*.scss', ['styles']);
    gulp.watch('js/**/*.js', ['js']);
    gulp.watch('img/**/*', ['images']);
});

gulp.task('default', ['connect', 'html', 'styles', 'js', 'images', 'watch']);
