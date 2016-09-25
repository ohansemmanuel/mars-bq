var gulp = require('gulp');
var bs = require('browser-sync').create();
var minCss = require('gulp-minify-css');
var sourceMaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var imageMin = require('gulp-imagemin');

gulp.task('images', function() {
	gulp.src('[src/img/**/*]')
		.pipe(imageMin())
		.pipe(gulp.dest('dist/img'))
		.pipe(bs.stream());

})

gulp.task('scripts', function() {
	gulp.src(['src/scripts/main.js'])
		.pipe(sourceMaps.init())
		.pipe(uglify())
		.pipe(sourceMaps.write())
		.pipe(gulp.dest('dist/scripts'))
		.pipe(bs.stream());
});

gulp.task('styles', function() {
	gulp.src(['src/styles/**/*.css'])
		.pipe(sourceMaps.init())
		.pipe(minCss())
		.pipe(sourceMaps.write())
		.pipe(gulp.dest('dist/styles'))
		.pipe(bs.stream());
});

gulp.task('default', function() {  
	bs.init({
		server: './'
	});

	//gulp.watch('src/**/*', bs.reload);
	gulp.watch('src/styles/**/*.css', ['styles']);
	gulp.watch('src/img/**/*', ['images']);
	gulp.watch('src/scripts/**/*.js', ['scripts']);
	gulp.watch('*.html', bs.reload)
})