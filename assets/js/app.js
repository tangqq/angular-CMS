/**
 * Created by Administrator on 2016/2/27.
 */
 var app = angular.module('myApp',['ui.router','tqq.ui','ui.directives','ui.service']);
  app.config(function($stateProvider,$urlRouterProvider,routerData,stateInitProvider){
    $urlRouterProvider.otherwise('/404');
    $urlRouterProvider.when('','/login');
    $urlRouterProvider.when('/','/admin/branch');
      //将config.js里面的routerData转换成路由块，转换规则请看config.js里的注释
      angular.forEach(routerData.stateArr,function(data){
            $stateProvider.state(stateInitProvider.nameInit(data.name),stateInitProvider.objInit(data,routerData.baseUrl));
      })

 $stateProvider     //也可以自己写路由块
     .state('error',{
      url:'/404',
      template:'<div class="text-lg-center pd-t-lg mg-t-lg text-danger"><h1><span class="icon icon-sad2  pd-r-sm text-size-llg"></span>页面不存在404！</h1>' +
      '<div class="text-lg-center"><a ui-sref="admin">跳转到首页</a></div></div>'
     })

})