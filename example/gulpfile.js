var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var browserify = require('browserify');
var vsource = require("vinyl-source-stream");
var babel = require('babelify');

var source = {
	appjs: './ui-src/app.js',
	js: ['./ui-src/**/*.js'],
	appcss: ['./ui-src/css/*.css'],
	apphtml: ['./ui-src/**/*.html'],
	appimg: ['./ui-src/img/*']
};

gulp.task('appjs', function(){
	browserify({ debug: true })
		.transform(babel)
		.require(source.appjs, { entry: true })
		.bundle()
		.pipe(vsource('app.min.js'))
		.pipe(gulp.dest('./uidist'));
});

gulp.task('appcss', function () {
	gulp.src(source.appcss)
		.pipe(concat('app.min.css'))
		.pipe(minifyCSS())
		.pipe(gulp.dest('./uidist'))
});

gulp.task('apphtml', function() {
	gulp.src(source.apphtml)
		.pipe(gulp.dest('./uidist'));
	gulp.src(source.appimg, {base: 'ui-src'})
		.pipe(gulp.dest('./uidist'));
});

gulp.task('watch', function() {
	gulp.watch(source.appcss, ['appcss']);
	gulp.watch(source.apphtml, ['apphtml']);
	gulp.watch(source.js, ['appjs']);
});

gulp.task('default', ['appjs', 'appcss', 'apphtml', 'watch']);

gulp.task('nw', ['appjs', 'appcss', 'apphtml']);