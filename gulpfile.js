var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemap = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var imagemin = require('gulp-imagemin')
var imageminPngquant = require('imagemin-pngquant');
var babel = require('gulp-babel');

gulp.task('default', ['content', 'copy-images', 'styles'], () => {
	gulp.watch('./client/views/**/*.html', ['content']);	
	gulp.watch('./client/images/*', ['copy-images']);	
	gulp.watch('./client/styles/**/*.css', ['styles']);
	gulp.watch('./client/scripts/**/*.js', ['scripts']);	
})

gulp.task('serve', ['content', 'copy-images', 'styles', 'scripts'], () => {
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
		use: [imageminPngquant({quality: '65-80', speed: 4})()]
		}))
	.pipe(gulp.dest('./server/public/assets/images'))
})

gulp.task('styles', () => {
	gulp.src('./client/styles/**/*.css')
		.pipe(gulp.dest('./server/public/assets/styles'))
		.pipe(reload({stream: true}));
});

gulp.task('scripts', () => {
	gulp.src('./client/scripts/**/*.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(sourcemap.init())
		.pipe(concat('app.js'))
		.pipe(uglify())
		.pipe(sourcemap.write())
		.pipe(gulp.dest('./server/public/assets/scripts'))
		.pipe(reload({stream: true}));
});
