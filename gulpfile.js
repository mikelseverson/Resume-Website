var gulp = require('gulp');

var imagemin = require('gulp-imagemin')
var imageminPngquant = require('imagemin-pngquant');

var concatCss = require('gulp-concat-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemap = require('gulp-sourcemaps');
var babel = require('gulp-babel');

var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('default', ['views', 'styles', 'scripts', 'images'], () => {
	gulp.watch('./client/views/**/*.html', ['views']);
	gulp.watch('./client/images/*', ['images']);
	gulp.watch('./client/styles/**/*.css', ['styles']);
	gulp.watch('./client/scripts/**/*.js', ['scripts']);
})

gulp.task('serve', ['views', 'styles', 'scripts'], () => {
browserSync.init({
	proxy: "localhost:5000"
})
	gulp.watch('./client/views/**/*.html', ['views']);
	gulp.watch('./client/images/*', ['images']);
	gulp.watch('./client/styles/**/*.css', ['styles']);
	gulp.watch('./client/scripts/**/*.js', ['scripts']);
});

gulp.task('views', () => {
	gulp.src('./client/views/index.html')
		.pipe(gulp.dest('./server/public/views'))
		.pipe(reload({stream: true}));
});

gulp.task('images', () => {
	gulp.src('./client/images/*')
	.pipe(imagemin({
		progressive: true,
		}))
	.pipe(gulp.dest('./server/public/images'))
})

gulp.task('styles', () => {
	gulp.src('./client/styles/**/*.css')
	    .pipe(concatCss("/stylesheet.css"))
		.pipe(gulp.dest('./server/public/styles'))
		.pipe(reload({stream: true}));
});

gulp.task('scripts', () => {
	gulp.src('./client/scripts/**/*.js')
		.pipe(babel())
		.pipe(sourcemap.init())
		.pipe(concat('app.js'))
		.pipe(uglify())
		.pipe(sourcemap.write())
		.pipe(gulp.dest('./server/public/scripts'))
		.pipe(reload({stream: true}));
});
