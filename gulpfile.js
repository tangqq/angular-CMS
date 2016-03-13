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
    sourcemaps = require('gulp-sourcemaps'),
    stripDebug = require('gulp-strip-debug');


//帮助
gulp.task('help',function(){
    console.log('	gulp p	  文件生产环境压缩打包');

    console.log('	gulp			    文件变动监控打包');

    console.log('	gulp r	          简历版转换sass');

    console.log('	gulp help			gulp参数说明');

    console.log('	gulp sass			sass转换');

    console.log('	gulp sass-min		转换压缩sass');

})
//生产环境输出
gulp.task('p',['sass-min','angular-min','min']);

gulp.task('default',['watch-angular','watch-sass']);
//监视编译angular
gulp.task('watch-angular',function(){
     gulp.watch(['./assets/js/*.js','./assets/js/*/*.js'],['angular'])
})
//监视sass
gulp.task('watch-sass',function(){
    gulp.watch(['./assets/sass/*.scss','./assets/sass/mixin/*.scss'],['sass']);
})

gulp.task('r',function(){
    gulp.src('./resume_assets/css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('tqqStyle.css'))
        .pipe(gulp.dest('./resume_assets/css'))
})
gulp.task('min',function(){
    gulp.src([
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-ui-router/release/angular-ui-router.js',
        'bower_components/tqqUi-angular-pagination/dist/tqqUi.js',
    ])
        .pipe(uglify({outSourceMap:false}))
        .pipe(concat('angular.min.js'))
        .pipe(gulp.dest('./dist'));
    gulp.src(['bower_components/bootstrap/dist/css/bootstrap.css','bower_components/tqqUi-angular-pagination/dist/tqqUi.css'])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/css'))
        .pipe(concat('production.min.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('./dist'))

})
//sass编译，普通版（未压缩）
gulp.task('sass',function(){
    gulp.src('./assets/sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/css'))
        .pipe(concat('tqqStyle.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist'))
})
//sass编译，压缩版
gulp.task('sass-min',function(){
    gulp.src('./assets/sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/css'))
        .pipe(concat('tqqStyle.min.css'))
        .pipe(minifycss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist'))

})
//angular 编译-合并
gulp.task('angular',function(){
    gulp.src(['./assets/js/*.js','./assets/js/*/*.js'])
        .pipe(ngAnnotate())
        .pipe(concat('my.js'))
        .pipe(gulp.dest('./dist'))
})
//angular 编译合并压缩
gulp.task('angular-min',function(){
    gulp.src(['./assets/js/*.js','./assets/js/*/*.js'])
        .pipe(ngAnnotate())
        .pipe(ngMin({dynamic:false}))
        .pipe(stripDebug())  //console
        .pipe(uglify({outSourceMap:false}))
        .pipe(concat('my.min.js'))
        .pipe(gulp.dest('./dist'))
})