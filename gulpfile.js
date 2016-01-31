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

gulp.task('default', ['content', 'styles'], () => {
	gulp.watch('./client/views/**/*.html', ['content']);	
	gulp.watch('./client/images/*', ['copy-images']);	
	gulp.watch('./client/styles/**/*.css', ['styles']);
	gulp.watch('./client/scripts/**/*.js', ['scripts']);	
})

gulp.task('serve', ['content', 'styles', 'scripts'], () => {
browserSync.init({
	proxy: "localhost:5000"
})
	gulp.watch('./client/views/**/*.html', ['content']);	
	gulp.watch('./client/images/*', ['copy-images']);	
	gulp.watch('./client/styles/**/*.css', ['styles']);
	gulp.watch('./client/scripts/**/*.js', ['scripts']);	
});

gulp.task('content', () => {
	gulp.src('./client/views/index.html')
		.pipe(gulp.dest('./server/public/assets/views'))
		.pipe(reload({stream: true}));
});

gulp.task('copy-images', () => {
	gulp.src('./client/images/*')
	.pipe(imagemin({
		progressive: true,
		}))
	.pipe(gulp.dest('./server/public/assets/images'))
})

gulp.task('styles', () => {
	gulp.src('./client/styles/**/*.css')
	    .pipe(concatCss("/stylesheet.css"))
		.pipe(gulp.dest('./server/public/assets/styles'))
		.pipe(reload({stream: true}));
});

gulp.task('scripts', () => {
	gulp.src('./client/scripts/**/*.js')
		.pipe(babel())
		.pipe(sourcemap.init())
		.pipe(concat('app.js'))
		.pipe(uglify())
		.pipe(sourcemap.write())
		.pipe(gulp.dest('./server/public/assets/scripts'))
		.pipe(reload({stream: true}));
});

