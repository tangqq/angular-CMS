/**
 * Created by Administrator on 2016/2/27.
 */
 var app = angular.module('myApp',['ui.router','tqq.ui','ui.directives']);
  app.config(function($stateProvider,$urlRouterProvider){
 $urlRouterProvider.otherwise('/404')
 $stateProvider
     .state('error',{
      url:'/404',
      template:'<div class="text-lg-center pd-t-lg mg-t-lg text-danger"><h1><span class="icon icon-sad2  pd-r-sm text-size-llg"></span>页面不存在404！</h1>' +
      '<div class="text-lg-center"><a ui-sref="admin">跳转到首页</a></div></div>'
     })
     .state('admin',{
      url:'/admin',
      templateUrl:'./view/admin.html',
      controller:'AdminController'
     })
     .state('admin.branch',{
       url:'/branch',
      templateUrl:'./view/branch/list.html'
     })
})