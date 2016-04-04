/**
 * Created by Administrator on 2016/2/27.
 */
 var app = angular.module('myApp',['ui.router','tqq.ui','ui.directives']);
  app.config(["$stateProvider", "$urlRouterProvider", "routerData", "stateInitProvider", function($stateProvider,$urlRouterProvider,routerData,stateInitProvider){
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
app.constant('routerData', {baseUrl:'./module',
    stateArr:[
    {name:'admin',viewUrl:'/common/'},
    {name:'login',viewUrl:'/login/'},
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
    .directive('eclFilter',function(){
        return {
            restrict:'EA',
            replace:true,
            scope:{eclFilter:'=',
                ngModel:'=',
                eclClick:'&',
                filterTitle:'@'
            },
            link:function(scope,element,attrs){
                console.log(scope.eclFilter)
                scope.$watch('ngModel',function(ec,abc){
                    if(ec==undefined){
                        return  ;
                    }else{
                        scope.eclClick()
                    }
                })
                scope.judge=[];
                scope.judge[0]=true;
                scope.update=function(key,index){
                    if(key){
                        scope.ngModel=key;
                    } else{
                        scope.ngModel='';
                    }
                }
            },
            template:'<div class="ecl-select"> '+
            '<div class="select-title">{{filterTitle}}</div> ' +
            '<span class="ecl-option" ng-class="{active:!ngModel}" ng-click="update(false,0)">全 部</span><span ng-repeat="(i,value) in eclFilter" class="ecl-option"ng-click="update(i,($index+1))" ng-class="{active:ngModel==i}">{{value}}</span> ' +
            '</div>'
        }
    })
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
.directive('tableList',function(){
     return {
        restrict : 'EA',
        replace:true,
         scope:true,
       /* scope:{
            tableData:'=',
            tdClick:'&',
            tableTitle:'=',
            checkbox:'='
        },*/
         link:function(scope,ele,atrs){
             scope.tqqqqqq='1231223'
             scope.tableData=scope[atrs.tableData]
             console.log(scope.tableData)
             console.log(scope)
             console.log(atrs)
             scope.abc=function(){
                //scope.tdClick({ads:123})
             };
         },
        controller:["$scope", function($scope){
            console.log($scope)
            //this.thisClick= $scope.tdClick();
        }],
        template:'<div class="table-responsive"> ' +
        '<table class="table table-hover text-center"> ' +
        '<thead> ' +
        '<tr> ' +
        '<th ng-click="abc(123)" ng-repeat="data in tableTitle track by $index" ng-if="data.init" class="text-center">{{data.name}}</th> ' +
        '</tr> ' +
        '</thead> ' +
        '<tbody> ' +
        '<tr ng-repeat="(key,value) in tableData track by $index" class="pointer" > ' +
        '<td ng-repeat="title in tableTitle track by $index" ng-if="title.init" ng-class="{chenckActive:checkbox[key] && !title.field[0].name,chenckboxP:!title.field[0].name}"><table-td td-data="value" title-data="title" chid-click="thisClick" td-index="key"></table-td></td> ' +
        '</tr> ' +
        '</tbody> ' +
        '</table> ' +
        '</div>'
    };
})
.directive('tableTd',["$filter", function($filter){
    function getObj(obj,arr){
        try{
            if(angular.isArray(arr)){
                var len= arr.length;
                if(len===0)return null;
                if(len===1)return obj[arr[0]];
                if(len===2)return obj[arr[0]][arr[1]];
                if(len===3)return obj[arr[0]][arr[1]][arr[2]];
                if(len===4)return obj[arr[0]][arr[1]][arr[2]][arr[3]];
            }else{
                throw '解析字段时出错';
            }
        }catch(ev){
            return ''
        }
    };
    function trueOrFalse(allData,thisData){
        var _a,_f,_g,_flen;
        _g=thisData.replace(/(^\s+)|(\s$)|(\s+)/g,'').split('|');
        if(_g.length<2){throw '没有定义过滤器'};
        _a=_g[0].split('.');
        _f=_g[1].split(':');
        _flen=_f.length;
        try{$filter(_f[0])}catch(ev){throw 'isShow传入的filter没有定义'};
        if(_flen===1 ){
            return $filter(_f[0])(getObj(allData,_a));
        }else if(_flen===2){
            return $filter(_f[0])(getObj(allData,_a),_f[1]);
        }else if(_flen ===3){
            return $filter(_f[0])(getObj(allData,_a),_f[1],_f[2]);
        }else if(_flen ===4){
            return $filter(_f[0])(getObj(allData,_a),_f[1],_f[2],_f[3])
        }else if(_flen === 5){
            return $filter(_f[0])(getObj(allData,_a),_f[1],_f[2],_f[3],_f[4])
        };
    };
    return {
        require:'^tableList',
        restrict : 'EA',
        replace:true,
        scope:{
            tdData:'=',
            titleData:'=',
            tdIndex:'=',
        },
        link:function(scope,ele,atrs,con){
            scope.$watch('tdData',function(da){
                uploadData();
            },true);
            scope.eventClick=function(){
                con.thisClick(arguments);
            }
            function uploadData(){
                if(scope.titleData.field){
                    if(Object.prototype.toString.call(scope.titleData.field) === '[object Array]'){
                        scope.judge=[];
                        scope.isArray=true;
                        angular.forEach(scope.titleData.field,function(ev,key){
                            if(ev.isShow){
                                var a=trueOrFalse(scope.tdData,ev.isShow)
                                scope.titleData.field[key].hide=a
                                scope.judge.push(a);
                            }
                        })
                    }else if(Object.prototype.toString.call(scope.titleData.field) === '[object String]'){
                        scope.text=''
                        var a, f, g,flen;
                        scope.titleData.field=scope.titleData.field.replace(/(^\s+)|(\s+$)|(\s+)/g,"");
                        g=scope.titleData.field.split('|');
                        if(g.length>1){
                            a=g[0].split('.');
                            f=g[1].split(':');
                            //这个循环是处理有filter并且filter传过来的是变量不是字符串
                            angular.forEach(f,function(ev,key){
                                if(!(ev.indexOf('[')===-1 || ev.indexOf(']')===-1)){
                                    var _q=ev.slice(1,-1);
                                    var _a=_q.split('.');
                                    f[key] = getObj(scope.tdData,_a);
                                }
                            })
                            try{
                                $filter(f[0])
                            }catch(ev){
                                throw '你所使用的filter没有定义，'
                            }
                            flen= f.length;
                            if(flen===1 ){
                                scope.text=$filter(f[0])(getObj(scope.tdData,a));
                            }else if(flen===2){
                                scope.text=$filter(f[0])(getObj(scope.tdData,a),f[1]);
                            }else if(flen ===3){
                                scope.text=$filter(f[0])(getObj(scope.tdData,a),f[1],f[2])
                            }else if(flen ===4){
                                scope.text=$filter(f[0])(getObj(scope.tdData,a),f[1],f[2],f[3])
                            }else if(flen === 5){
                                scope.text=$filter(f[0])(getObj(scope.tdData,a),f[1],f[2],f[3],f[4])
                            };
                        }else{
                            a= scope.titleData.field.split('.');
                            scope.text=getObj(scope.tdData,a);
                        };
                    };
                };
            };
        },
        template:'<div><div ng-if="isArray"><a ng-repeat="val in titleData.field track by $index" ng-click="eventClick(val.judge,tdData,tdIndex)" class="{{val.class}}" ng-if="!judge[$index]">{{val.name}}</a></div>' +
        '<div ng-if="!isArray" ng-click="eventClick(titleData.judge,tdData,tdIndex)"><span class="{{titleData.class}}">{{text}}</span></div></div>'
    }
}]);
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
            if(_level[0]==='admin'){
                _obj.abstract = true;
            }
            _obj.url =  '/' + _level[_len-1];
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
    $scope.filterData={
        'sjfj':'选项一',
        'asd':'选项二',
        '123':'选项三',
    }

     $scope.listData=[
         {name:'xkdfs',phone:'14544449866',sex:'nan'},
         {name:'xkdfs',phone:'14544449866',sex:'nan'},
         {name:'xkdfs',phone:'14544449866',sex:'nan'},
          {name:'xkdfs',phone:'14544449866',sex:'nan'},
     ]
    $scope.title=[
        {name:'姓名',init:true,show:true,field:[{name:''}]},
        {name:'姓名',init:true,show:true,field:'name'},
        {name:'电话',init:true,show:true,field:'phone'},
        {name:'性别',init:true,show:true,field:'sex'},
    ]
    console.log('这里是控制器的$scope')
    console.log($scope)
    $scope.abcd=function(){
        console.log(arguments)
    }
}]);
app.controller('AdminBranchShowController',["$scope", function($scope){

}]);
app.controller('AdminBranchAddController',["$scope", function($scope){

}]);
app.controller('AdminBranchEditController',["$scope", function($scope){

}]);
/**
 * Created by Administrator on 2016/3/23.
 */
app.controller('AdminController',["$scope", "menuData", function($scope,menuData){
    $scope.menuData=menuData;
}])
/**
 * Created by Administrator on 2016/3/23.
 */
 app.controller('LoginController',["$scope", function($scope){

}])