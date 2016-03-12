/**
 * Created by Administrator on 2016/2/27.
 */
 var app = angular.module('myApp',['ui.router','tqq.ui','ui.directives']);
  app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider,$urlRouterProvider){
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
}])
/**
 * Created by Administrator on 2016/2/27.
 */
app.constant('menuData',[
    {first:{
        icon:'glyphicon glyphicon-home',
        name:'门店管理',
        url:null,
    },
        second:[
            {icon:'glyphicon glyphicon-home',name:'门店管理',url:'admin.branch'},
            {icon:'glyphicon glyphicon-home',name:'工位管理',url:'admin.branch-show'},
        ]
    },
    {first:{
        icon:'glyphicon glyphicon-user',
        name:'员工管理',
        url:null,
    },
        second:[
            {icon:'',name:'员工列表',url:'admin.staff'},
        ]
    },
    {first:{
        icon:'glyphicon glyphicon-tasks',
        name:'商品模板',
        url:null,
    },
        second:[
            {icon:'',name:'项目模板',url:'admin.project'},
        ]
    },
    {first:{
        icon:'glyphicon glyphicon-tasks',
        name:'商品管理',
        url:null,
    },
        second:[
            {icon:'',name:'商品管理',url:'admin.goods'},
        ]
    },
    {first:{
        icon:'glyphicon glyphicon-list-alt',
        name:'交易管理',
        url:null,
    },
        second:[
            {icon:'',name:'订单列表',url:'admin.order'}
        ]
    },

])
/**
 * Created by Administrator on 2016/2/27.
 */
app.controller('AdminController',["$scope", "menuData", function($scope,menuData){
    $scope.menuData=menuData;
}])
/**
 * Created by Administrator on 2016/3/11.
 */
angular.module('ui.directives',[])
.directive('menu',function(){
    return {
        restrict:'EA',
        replace:true,
        scope:{
            menuData:'=',
            isHide:'=',
        },
        link:function(scope,ele,atrs){
            scope.$watch('isHide',function(ev,ea){
                if(ev){
                    $('body').css('overflow-y','hidden')
                }else{
                    $('body').css('overflow-y','')
                }
            })
        },
        template:'<div class="menu-box" ng-class="{active:isHide}"><nav class="sidebar-menu">'+
        '<a class="menu-first" ng-repeat-start="(key,value) in menuData track by $index"> ' +
        '<span><i class="{{value.first.icon}}"></i>{{value.first.name}}</span> ' +
        '</a> ' +
        '<ul class=" menu-second " ng-repeat-end ng-if="value.second.length>0"> ' +
        '<li ng-repeat="men in value.second track by $index"> ' +
        '<a ui-sref-active="active" ui-sref="{{men.url}}" ng-click="postJudge($event)"> ' +
        '<i class="{{men.icon}}"></i><span>{{men.name}}</span> ' +
        '</a> ' +
        '</li> ' +
        '</ul> ' +
        ' </nav></div>'
    }
})