/**
 * Created by Administrator on 2016/2/21.
 */
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    ngAnnotate = require('gulp-ng-annotate'),
    ngMin = require('gulp-ngmin'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps'),
    livereload = require('gulp-livereload'),
    open = require('gulp-open'),
    stripDebug = require('gulp-strip-debug');

const config={
    JS_WATCH:['./assets/js/*.js','./assets/js/*/*.js','./module/*/*.js'],
    CSS_WATCH:['./assets/css/*.css','./module/*/*.css','./module/*.css'],
}

//帮助
gulp.task('help',function(){
    console.log('	gulp p	  文件生产环境压缩打包');

    console.log('	gulp			    文件变动监控打包');

})

gulp.task('default',['watch-angular','watch-css']);
//监视编译angular
gulp.task('watch-angular',function(){
    gulp.watch(config.JS_WATCH,['angular'])
})
//监视sass
gulp.task('watch-css',function(){
    gulp.watch(config.CSS_WATCH,['css']);
})

 //sass编译，普通版（未压缩）
gulp.task('css',function(){
    gulp.src(config.CSS_WATCH)
        .pipe(sourcemaps.init())
        .pipe(concat('tqqStyle.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist'))
})
//angular 编译-合并
gulp.task('angular',function(){
    gulp.src(config.JS_WATCH)
        .pipe(ngAnnotate())
        .pipe(concat('my.js'))
        .pipe(gulp.dest('./dist'))
})
//angular 编译合并压缩
gulp.task('angular-min',function(){
    gulp.src(config.JS_WATCH)
        .pipe(ngAnnotate())
        .pipe(ngMin({dynamic:false}))
        .pipe(stripDebug())  //console
        .pipe(uglify({outSourceMap:false}))
        .pipe(concat('my.min.js'))
        .pipe(gulp.dest('./dist'))
})