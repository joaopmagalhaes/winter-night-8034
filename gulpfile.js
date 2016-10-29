'use strict'

var autoprefixer = require('gulp-autoprefixer');
var gulp = require('gulp');
var path = require('path');
var plumber = require('gulp-plumber');
var print = require('gulp-print');
var sass = require('gulp-sass');
var size = require('gulp-size');

/**
 * Styles
 */

gulp.task('styles', ['apps-sass']);
gulp.task('apps-sass', appsStyles);

function appsStyles() {
    return gulp.src(['css/*.scss'], { base: 'css' })
        .pipe(plumber())
        .pipe(sass.sync({
            outputStyle: 'expanded',
            precision: 10,
            includePaths: ['.'],
        }).on('error', sass.logError))
        .pipe(autoprefixer({ browsers: ['last 10 version'] }))
        .pipe(gulp.dest('css'))
        .pipe(print())
        .pipe(size());
}

// Watch
gulp.task('watch', ['build'], function () {
        // Watch app .scss files
        gulp.watch(['css/*.scss'], function(obj) {
        if (obj.type === 'changed' || obj.type === 'added') {
            return gulp.src(obj.path)
                .pipe(plumber())
                .pipe(print())
                .pipe(sass.sync({
                    outputStyle: 'expanded',
                    precision: 10,
                    includePaths: ['.'],
                }).on('error', sass.logError))
                .pipe(autoprefixer({ browsers: ['last 10 version'] }))
                .pipe(gulp.dest(path.dirname(obj.path)))
                .pipe(print())
                .pipe(size());
        }

        return true;
    });
});

// Build
gulp.task('build', ['styles'], function() {});

// Default task
gulp.task('default', ['build']);
