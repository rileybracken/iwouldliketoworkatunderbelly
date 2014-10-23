var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var coffee = require('gulp-coffee');
var sass = require('gulp-sass')

gulp.task('scripts', function () {
	return  gulp.src('src/js/**/*')
		.pipe(concat('all.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
})

gulp.task('markup', function () {
	return gulp.src('src/index.html')
		.pipe(gulp.dest('dist'));
});

gulp.task('styles', function() {
  return gulp.src('src/css/*.css')
    .pipe(gulp.dest('dist/css'));
});

gulp.task('vendorjs', function() {
	return gulp.src('src/vendor/*js')
		.pipe(gulp.dest('dist/vendor'));
})

gulp.task('watch', function () {
	gulp.watch('src/js/**/*.coffee', ['scripts']);
	gulp.watch('src/index.html', ['markup']);
	gulp.watch('src/css/*.scss', ['styles']);
	gulp.watch('src/vendor/*.js', ['vendorjs']);
});

gulp.task('default', [
	'markup',
	'scripts',
	'styles',
	'vendorjs',
	'watch'
]);
