var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    usemin  = require('gulp-usemin'),
    rev = require('gulp-rev'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync').create();

gulp.task('previewDist', function() {
    browserSync.init({
        notify: false,
        server: {
            baseDir: "dist"
        }
    });
});

//delete files before updating new ones
gulp.task('deleteDistFolder', function () {
   return del('./dist');
});


//copy general files
gulp.task('copyGeneralFiles', ['deleteDistFolder'], function () {

    var pathToCopy = [
        './app/**/*',
        '!./app/index.html',
        '!./app/assets/images/**',
        '!./app/assets/styles/**',
        '!./app/assets/scripts/**',
        '!./app/temp',
        '!./app/temp/**'
    ]
   return gulp.src(pathToCopy)
       .pipe(gulp.dest('./dist'));
});

//optimize the images before sending to destination
gulp.task('optimizeImages', ['deleteDistFolder', 'icons'], function () {
    return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
        .pipe(imagemin({
            progress: true,
            interlaced: true,
            multipass: true
        }))
        .pipe(gulp.dest('./dist/assets/images'));
});

gulp.task('usemin', ['deleteDistFolder', 'styles'], function () {
   return gulp.src('./app/index.html')
       .pipe(usemin({
          css: [ function () { return rev() }, function () { return cssnano() }],
          js: [ function () { return rev() }, function () { return uglify() }],
       }))
       .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'usemin']);