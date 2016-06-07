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
    SASS_WATCH:['./assets/sass/*.scss','./module/*/*.scss','./module/*.scss'],
    JS_PATH:[
        'bower_components/jquery/dist/jquery.js',
        'bower_components/moment/moment.js',
        'bower_components/moment/locale/zh-cn.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        'bower_components/angular-ui-router/release/angular-ui-router.js',
        'bower_components/tqqUi-angular-pagination/dist/tqqUi.js',
        'bower_components/angular-animate/angular-animate.js',
        'bower_components/angular-toastr/dist/angular-toastr.tpls.js',
        'bower_components/jquery-form/jquery.form.js',
        'bower_components/angular-bootstrap-lightbox/dist/angular-bootstrap-lightbox.js',
        'bower_components/bootstrap-daterangepicker/daterangepicker.js',
        'bower_components/alertifyjs/dist/js/ngAlertify.js',
    ],
    CSS_PATH:[
        'bower_components/bootstrap/dist/css/bootstrap.css',
        'bower_components/tqqUi-angular-pagination/dist/tqqUi.css',
        'bower_components/angular-toastr/dist/angular-toastr.css',
        'bower_components/angular-bootstrap-lightbox/dist/angular-bootstrap-lightbox.css',
        'bower_components/bootstrap-daterangepicker/daterangepicker.css',
        'bower_components/alertifyjs/dist/css/alertify.css',
    ]
}

//帮助
gulp.task('help',function(){
    console.log('	gulp p	  文件生产环境压缩打包');

    console.log('	gulp			    文件变动监控打包');

    console.log('	gulp help			gulp参数说明');

    console.log('	gulp sass			编译sass');

    console.log('	gulp sass-min			编译压缩sass');

})
//生产环境输出
gulp.task('p',['sass-min','angular-min','min','move']);

gulp.task('default',['watch-angular','watch-sass']);
//监视编译angular
gulp.task('watch-angular',function(){
    gulp.watch(config.JS_WATCH,['angular'])
})
//监视sass
gulp.task('watch-sass',function(){
    gulp.watch(config.SASS_WATCH,['sass']);
})

gulp.task('min',function(){
    gulp.src(config.JS_PATH)
        .pipe(uglify({outSourceMap:false}))
        .pipe(stripDebug())  //console
        .pipe(uglify({outSourceMap:false}))
        .pipe(concat('production.min.js'))
        .pipe(gulp.dest('./dist'));
    gulp.src(config.CSS_PATH)
        .pipe(sourcemaps.init())
        .pipe(concat('production.min.css'))
        .pipe(minifycss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist'))

})

//移动文件
gulp.task('move',function(){
    gulp.src('./assets/img/*').pipe(gulp.dest('./dist/img'));
    gulp.src('./assets/ogg/*').pipe(gulp.dest('./dist/ogg'))
})
//删除src
gulp.task('clean',function(){
    gulp.src('./src').pipe(clean());
})
//sass编译，普通版（未压缩）
gulp.task('sass',function(){
    gulp.src(config.SASS_WATCH)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/css'))
        .pipe(concat('tqqStyle.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist'))
})
//sass编译，压缩版
gulp.task('sass-min',function(){
    gulp.src(config.SASS_WATCH)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/css'))
        .pipe(concat('tqqStyle.min.css'))
        .pipe(gulp.dest('./dist'))
        .pipe(minifycss())
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