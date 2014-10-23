var gulp 			= require('gulp');
var uglify 		= require('gulp-uglify');
var concat 		= require('gulp-concat');
var coffee 		= require('gulp-coffee');
var sass 			= require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var concatCSS = require('gulp-concat-css');

gulp.task('scripts', function () {
	return  gulp.src('src/js/**/*')
		.pipe(coffee())
		.pipe(concat('all.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
})

gulp.task('markup', function () {
	return gulp.src('src/index.html')
		.pipe(gulp.dest('dist'));
});

gulp.task('styles', function() {
	return gulp.src('src/css/*.scss')
		.pipe(sass())
		.pipe(concatCSS("styles.css"))
		.pipe(minifyCSS())
		.pipe(gulp.dest('dist/css'));
});

gulp.task('vendor', function() {
	return gulp.src('src/vendor/*')
		.pipe(gulp.dest('dist/vendor'));
})

gulp.task('watch', function () {
	gulp.watch('src/js/**/*.coffee', ['scripts']);
	gulp.watch('src/index.html', ['markup']);
	gulp.watch('src/vendor/*', ['vendor']);
});

gulp.task('default', [
	'markup',
	'scripts',
	'styles',
	'vendor',
	'watch'
]);
