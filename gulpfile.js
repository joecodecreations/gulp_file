const gulp = require('gulp'), // Task Runner - Automation
sass = require('gulp-sass'), // SCSS Compiler
sassGlob = require('gulp-sass-glob'), // SCSS Globs Support, Globs are **
cssnano = require('gulp-cssnano'), // CSS Minify
requirejsOptimize = require('gulp-requirejs-optimize'), // RequireJS AMD Modules Support
imageop = require('gulp-image-optimization'), // Image Compression for PNG, JPEG, & GIF
del = require('del'); // Delete Files

// Default Gulp Task, Runs Automatically
gulp.task('default', [
  'requirejs-optimize:clean','requirejs-optimize','requirejs-optimize:watch',
  'scss:clean','scss','scss:watch',
  'standalone-js:clean','standalone-js','standalone-js:watch',
  'image-compression:clean','image-compression','image-compression:watch',
  'fonts:clean','fonts','fonts:watch'
]);

// Delete CSS Build Resources
gulp.task('scss:clean', function(){
  return del(['public/resources/stylesheets/**/*']);
});

// SCSS Compilation, CSS Minification
gulp.task('scss',function(){
  return gulp.src('src/scss/**/*.scss')
    .pipe(sassGlob())
    .pipe(sass({}).on('error', sass.logError))
    .pipe(cssnano())
    .pipe(gulp.dest('public/resources/stylesheets'));
});

// SCSS Watcher
gulp.task('scss:watch', function(){
  return gulp.watch('src/scss/**/*.scss', ['scss:clean','scss']);
});

// Delete JavaScript Build Resources
gulp.task('requirejs-optimize:clean', function(){
  return del(['public/resources/javascript/main.js']);
});

// Optimize RequireJS Modules on the Backend
gulp.task('requirejs-optimize', function () {
	return gulp.src('src/javascript/main.js')
		.pipe(requirejsOptimize())
		.pipe(gulp.dest('public/resources/javascript'))
});

// RequireJS Optimizer Watcher
gulp.task('requirejs-optimize:watch', function(){
  return gulp.watch('src/javascript/**/*', ['requirejs-optimize:clean','requirejs-optimize']);
});

// Delte Standalone JS Resources
gulp.task('standalone-js:clean', function(){
  return del(['public/resources/javascript/standalone/*.js']);
});

// Standalone JS Copying
gulp.task('standalone-js', function () {
	return gulp.src('src/javascript/standalone/*.js')
		.pipe(gulp.dest('public/resources/javascript/standalone/'))
});

// Standalone JS Watcher
gulp.task('standalone-js:watch', function(){
  return gulp.watch('src/javascript/standalone/*.js', ['standalone-js:clean','standalone-js']);
});

// Delete Image Resources
gulp.task('image-compression:clean', function(){
  return del(['public/resources/images/*']);
});

// Image Compression & Copying
gulp.task('image-compression', function(cb) {
    gulp.src(['src/images/**/*.png','src/images/**/*.jpg','src/images/**/*.gif','src/images/**/*.jpeg','src/images/**/*.svg']).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('public/resources/images')).on('end', cb).on('error', cb);
});

// Image Watcher
gulp.task('image-compression:watch', function(){
  return gulp.watch('src/images/**/*', ['image-compression:clean','image-compression']);
});

// Delete Font Resources
gulp.task('fonts:clean', function(){
  return del(['public/resources/fonts/*']);
});

// Font Copying
gulp.task('fonts', function () {
	return gulp.src('src/fonts/**/*')
		.pipe(gulp.dest('public/resources/fonts/'))
});

// Font Watcher
gulp.task('fonts:watch', function(){
  return gulp.watch('src/fonts/**/*', ['fonts:clean','fonts']);
});

