/**
 * Created by Administrator on 2016/2/27.
 */
 var app = angular.module('myApp',['ui.router','tqq.ui','ui.directives']);
  app.config(["$stateProvider", "$urlRouterProvider", "routerData", "stateInitProvider", function($stateProvider,$urlRouterProvider,routerData,stateInitProvider){
    $urlRouterProvider.otherwise('/404');
    $urlRouterProvider.when('','/admin/branch');
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

}])
/**
 * Created by Administrator on 2016/2/27.
 */
app.controller('AdminController',["$scope", "menuData", function($scope,menuData){
        $scope.menuData=menuData;
}])
/**
 * Created by Administrator on 2016/2/27.
 */
/*
*##菜单栏定义
*first:一级菜单；
*   second:二级菜单、数组里面是对象；
*   icon:菜单的图标；
*   name:菜单的名称；
*   url:ui-router定义的路由模块的名称，用作ui-sref的值；
* */
app.constant('menuData',[
    {first:{icon:'glyphicon glyphicon-home', name:'店面管理', url:null,},
        second:[
                {icon:'glyphicon glyphicon-list',name:'列表',url:'admin.branch'},
                {icon:'glyphicon glyphicon-plus',name:'添加',url:'admin.branchAdd'},
        ]},
    {first:{icon:'glyphicon glyphicon-apple', name:'商品管理', url:null,},
     second:[
        {icon:'glyphicon glyphicon-list',name:'列表',url:'admin.goods'},
        {icon:'glyphicon glyphicon-plus',name:'添加',url:'admin.goodsAdd'},
        {icon:'glyphicon glyphicon-stats',name:'统计',url:'admin.goodsStats'},
    ]},
    {first:{icon:'glyphicon glyphicon-list-alt', name:'订单管理', url:null,},
    second:[
        {icon:'glyphicon glyphicon-list',name:'列表',url:'admin.order'},
        {icon:'glyphicon glyphicon-plus',name:'添加',url:'admin.orderAdd'},
        {icon:'glyphicon glyphicon-stats',name:'统计',url:'admin.orderStats'},
    ]}
])
/*
*##路由配置
* baseUrl:template页面模块存放的路径，这里的是放在view文件夹下，所以是'./view';
* stateArr:路由模块数组，数组里的每个对象都会转换成一个路由，其中转换的路由的模块名为name值去掉后面的'/:id',templateUrl为最后一个.后面的值.html;controller为去掉'/:id'的字符串的驼峰写法；
* 如：{name:'admin.branchShow/:id',viewUrl:'/branch/'},最终会转换成
* $stateProvider.state('admin.branchShow',{
 url:'/branchShow/:id',
 templateUrl:'./view/branch/branchShow.html',
 controller:'AdminBranchShowController})
* */
app.constant('routerData', {baseUrl:'./view',
    stateArr:[
    {name:'admin',viewUrl:'/'},
    {name:'admin.branch',viewUrl:'/branch/'},
    {name:'admin.branchShow/:id',viewUrl:'/branch/'},
    {name:'admin.branchAdd',viewUrl:'/branch/'},
    {name:'admin.branchEdit',viewUrl:'/branch/'},
    {name:'admin.goods',viewUrl:'/goods/'},
    {name:'admin.goodsAdd',viewUrl:'/goods/'},
    {name:'admin.goodsShow',viewUrl:'/goods/'},
    {name:'admin.goodsEdit',viewUrl:'/goods/'},
    {name:'admin.goodsStats',viewUrl:'/goods/'},
],})
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
/**
 * Created by Administrator on 2016/3/13.
 */
app.provider('stateInit',function(){
    this.ctrlInit=function(arr){
        var _level = arr.split(/\.|\-|\//);
        var _len=_level.length;
        if(_level[_len-1]==':id'){
             _level.length= _len =_len-1;
        }
        for(var a= 0;a<_len;a++){
             _level[a] = _level[a].charAt(0).toUpperCase() + _level[a].slice(1)
        }
        return _level.join('') + 'Controller';
    };
    this.nameInit=function(name){
        var _level = name.split(/\//)
        return _level[0];
    };
    this.objInit=function(obj,baseUrl){
        var _obj={};
        var _level = obj.name.split(/\.|\//);
        var _levelUrl=obj.name.split('.')
        var _UrlStr = _levelUrl[_levelUrl.length-1];
        var _len=_level.length;
        if(_level[_len-1]==':id'){
            _level.length= _len =_len-1;
        }
        if(_len>1){
            _obj.url = '/' + _UrlStr;
            _obj.controller=this.ctrlInit(obj.name);
            _obj.templateUrl = baseUrl +obj.viewUrl + _level[_len-1]+'.html'
        }else{
            _obj.url =  '/' + _level[_len-1];
            _obj.abstract = true;
            _obj.controller = this.ctrlInit(obj.name);
            _obj.templateUrl = baseUrl +obj.viewUrl + _level[_len-1]+'.html'
        }
        return _obj;
    }
    this.$get=function(){
        return {}
    }
})
/**
 * Created by Administrator on 2016/3/13.
 */
app.controller('AdminBranchController',["$scope", function($scope){

}]);
app.controller('AdminBranchShowController',["$scope", function($scope){

}]);
app.controller('AdminBranchAddController',["$scope", function($scope){

}]);
app.controller('AdminBranchEditController',["$scope", function($scope){

}]);