/**
 * Created by Administrator on 2016/2/27.
 */
 var app = angular.module('myApp',['ui.router']);
   app.config(function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/404');
    $urlRouterProvider.when('','/admin/page-one');
    $urlRouterProvider.when('/','/admin/page-one');

 $stateProvider     //也可以自己写路由块
     .state('error',{
      url:'/404',
      template:'<div class="text-center"><h1>页面不存在404！</h1>' +
      '<div class="text-center"><a ui-sref="pageOne">跳转到首页</a></div></div>'
     })
      .state('pageOne',{
         url:'/page-one',
         templateUrl:'./module/one/page.html',
          controller:'PageOneController',
     })
     .state('pageTwo',{
         url:'/page-two',
         templateUrl:'./module/two/page.html',
         controller:'PageTwoController',
     })
     .state('pageThree',{
         url:'/page-three',
         templateUrl:'./module/three/page.html',
         controller:'PageThreeController',
     })

})