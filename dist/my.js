/**
 * Created by Administrator on 2016/2/27.
 */
 var app = angular.module('myApp',['ui.router']);
/**
 * Created by Administrator on 2016/2/27.
 */

/**
 * Created by Administrator on 2016/2/27.
 */
app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/404')
    $stateProvider
        .state('error',{
            url:'/404',
            template:'<div class="text-lg-center pd-t-lg mg-t-lg text-danger"><h1><span class="icon icon-sad2  pd-r-sm text-size-llg"></span>页面不存在404！</h1></div>'
        })
        .state('admin',{
            url:'/admin',
            templateUrl:'./view/admin.html',

        })
}])