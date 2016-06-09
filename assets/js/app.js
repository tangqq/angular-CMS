var app = angular.module('myApp',['ui.router']);
app.config(function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/404');
     $urlRouterProvider.when('','/common/page-one');
    $urlRouterProvider.when('/','/common/page-one');

    $stateProvider     //也可以自己写路由块
        .state('error',{
            url:'/404',
            template:'<div class="text-center"><h1>页面不存在404！</h1>' +
            '<div class="text-center"><a ui-sref="common.pageOne">跳转到首页</a></div></div>'
        })
        .state('common',{
            url:'/common',
            templateUrl:'./module/common/page.html',
            controller:'CommonController',
        })
        .state('common.pageOne',{
            url:'/page-one',
            templateUrl:'./module/one/page.html',
            controller:'PageOneController',
        })
        .state('common.pageTwo',{
            url:'/page-two',
            templateUrl:'./module/two/page.html',
            controller:'PageTwoController',
        })
        .state('common.pageThree',{
            url:'/page-three',
            templateUrl:'./module/three/page.html',
            controller:'PageThreeController',
        })
        .state('user',{
            url:'/user',
            templateUrl:'./module/user/admin.html',
        })
        .state('user.home',{
            url:'/home',
            templateUrl:'./module/home/page.html',
        })
        .state('user.view',{
            url:'/view',
            templateUrl:'./module/view/page.html',
        })

})