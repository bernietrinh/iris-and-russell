var gulp            = require('gulp');
var autoprefixer    = require('autoprefixer');
var cleanCSS        = require('gulp-clean-css');
var del             = require('del');
var notify          = require('gulp-notify');
var plumber         = require('gulp-plumber');
var postcss         = require('gulp-postcss');
var rename          = require('gulp-rename');
var runSequence     = require('run-sequence');
var sass            = require('gulp-sass');
var sourcemaps      = require('gulp-sourcemaps');
var uglify          = require('gulp-uglify');
var concat          = require('gulp-concat');
const imagemin      = require('gulp-imagemin');

// ---------- Task for compiling Sass into CSS
gulp.task('styles', function() {

    var processors = [
        autoprefixer({browsers: ['last 3 versions']})
    ];

    gulp.src(['src/sass/**/*.scss'])
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(postcss(processors))
        .pipe(gulp.dest('./src/css'))

        .pipe(cleanCSS())
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest('./src/css'))
        .pipe(notify("Sass Compiled! ( <%= file.relative %> )"))
});


gulp.task('image', function () {
  gulp.src('img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('src/img'));
});

// ---------- Task for compiling and modifying scripts
gulp.task('scripts', function() {

    gulp
        .src([
          'app.js',
          'controllers/*.js',
          'services/*.js'
        ])
        .pipe(concat('iris-and-russell.js'))
        .pipe(gulp.dest('./src/js'))
        .pipe(notify("JavaScript concatenated! ( <%= file.relative %> )"))
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest('./src/js'))
        .pipe(notify("JavaScript Compiled! ( <%= file.relative %> )"));

});


// ---------- Tasks to clean out the build directory
gulp.task('clean:css',function() {
    return del([
        'src/css/*.css',
        '!src/css/lib'
    ]);
});
gulp.task('clean:js',function() {
    return del([
        'src/js/*.js'
    ]);
});


// ---------- Watch Gulp files for changes
gulp.task('watch', function() {
    gulp.watch('src/sass/**/*', ['clean:css', 'styles']);
    gulp.watch(['lib/*'], ['clean:js', 'scripts']);
    gulp.watch(['img/**/*'], ['image']);
});



// ---------- Default task
gulp.task('default', function() {
    runSequence('clean:css', 'clean:js', ['scripts', 'styles', 'image', 'watch']);
});