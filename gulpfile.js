/**
 * Created by Administrator on 2016/2/21.
 */
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    ngAnnotate = require('gulp-ng-annotate'),
    ngMin = require('gulp-ngmin'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    stripDebug = require('gulp-strip-debug');
gulp.task('production',function(){

})

gulp.task('default',function(){
    console.log('项目启动')
})