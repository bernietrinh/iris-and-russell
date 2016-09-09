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


// ---------- Task to Lint Sass files
// gulp.task('scss-lint', function() {
//
//     gulp.src(['sass/**/*.scss'])
//         .pipe(plumber({
//             errorHandler: notify.onError("Error: <%= error.message %>")
//         }))
//         .pipe(scsslint({'config': '.scss-lint.yml'}))
//         .pipe(scsslint.failReporter())
// });

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



// ---------- Task for compiling and modifying scripts
gulp.task('scripts', function() {

    gulp
        .src([
        ])
        .pipe(concat('iris-and-russell.js'))
        .pipe(gulp.dest('/'))
        .pipe(notify("JavaScript concatenated! ( <%= file.relative %> )"))
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest('/'))
        .pipe(notify("JavaScript Compiled! ( <%= file.relative %> )"));

});



// ---------- Tasks to clean out the build directory
gulp.task('clean:css',function() {
    return del([
        'src/css/**/*'
    ]);
});
gulp.task('clean:js',function() {
    return del([
        'iris-and-russell.js'
    ]);
});



// ---------- Watch Gulp files for changes
gulp.task('watch', function() {
    gulp.watch('src/sass/**/*', ['clean:css', 'styles']);
    gulp.watch(['lib/*'], ['clean:js', 'scripts']);
});



// ---------- Default task
gulp.task('default', function() {
    runSequence('clean:css', 'clean:js', ['scripts', 'styles', 'watch']);
});