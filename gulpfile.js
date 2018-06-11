const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify')

gulp.task('default', ['copy-html', 'styles', 'scripts'], function(){
  gulp.watch('./src/sass/**/*.scss', ['styles']);
	gulp.watch('./src/index.html',['copy-html']);
	gulp.watch('./src/js/*.js', function(){
		gulp.src('./src/js/*.js')
				.pipe(gulp.dest('./dist/js'))
				.pipe(browserSync.stream());

	})

	browserSync.init({
		server: './dist'
	});

})

gulp.task('styles', function () {
	return gulp.src('./src/sass/**/*.scss')
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSync.stream());
});

gulp.task('copy-html', function(){
  gulp.src('./src/index.html')
      .pipe(gulp.dest('./dist'))
      .pipe(browserSync.stream());
});

gulp.task('copy-fonts', function(){
  gulp.src('./src/fonts/**/*')
      .pipe(gulp.dest('./dist/fonts'));
      
});

gulp.task('copy-jasmine', function(){
  gulp.src('./src/jasmine/**/*')
      .pipe(gulp.dest('./dist/jasmine'));
      
});

gulp.task('scripts', function() {
	gulp.src('./src/js/**/*.js')
  
		// .pipe(babel())
		// .pipe(concat('app.js'))
		// .pipe(uglify())
		.pipe(gulp.dest('./dist/js'));
});

gulp.task('dist', [
  'copy-html',
  'copy-fonts',
  'copy-jasmine',
	'styles',
	'scripts'
]);