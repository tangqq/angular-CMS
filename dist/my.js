/**
 * Created by Administrator on 2016/2/27.
 */
 var app = angular.module('myApp',['ui.router','tqq.ui','ui.directives','ui.service']);
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
angular.module('ui.directives',[]).filter('toHtml',["$sce", function($sce){
    return function(data){
        return $sce.trustAsHtml(data);
    }
}])
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

/**
 * tableList参数说明
 * 'table-data':整个列表的数据，后端接口获取，必须是数组。
 * 'table-title':列表的头信息已经显示数据规则。
 *          规则详解：
 *              {
 *              name:'门店编号',  ===>列表的标题，必须字符串。
 *              defaultHide:true/false, ===>此列默认初始时要不要隐藏。布尔值：为true时隐藏，为false时不隐藏。
 *              lock:true/false,            ===>是否冻结此列的显示隐藏操作。true冻结。
 *              field:'branchId',  这个是配置规则。①：字符串配置，1：直接是取值的属性，比如data.branchInfo.name. 可以用|使用filter过滤。如：data.name|myFilter:'adss',可以加class属性在这个值上面加个div。
 *                                                  ②：可以是数组，数组里面就是具体的元素个数。
 *                                                  field:[
                                                                {node:'<div class="edit">项目管理</div>',judge:''},   //node可以是字符串，节点字符串，judge是触发点击事件的给个列的区别标识符。
                                                                {node:'<div class="edit">项目分配</div>',judge:''}
                                                          ]
 *              judge:'SHOW',  触发点击事件的区别标识符。
 *              class:'text-primary' 配合field的字符串形式直接使用。
 *              },
 * 'table-checked':需要进行多选需求的时候用到，必须是一个数组。有这个值的时候table-title的规则里必须有一个’<div class="checkCtrl"></div>’作为多选按钮。
 * 'tqq-click':一个函数的名称，这个函数会在点击所有的td时触发，在controller里定义好这个函数，函数里有栅格参数。第一个是整个列的数据，第二个是标识符，第三个是这条数据的index.
 * **/
.directive('tableList',function(){
     return {
        restrict : 'EA',
        replace:true,
         scope:{
             tableData:'=',
             tableTitle:'=',
             tableChecked:'=',
               tqqClick:'&',
         },
         link:function(scope,ele,atrs){
             if(!atrs.tqqClick){
                 console.warn("没有'tqq-click'处理点击事件，你将无法获取table的点击操作")
             }
             setTimeout(function(){
                 var ele=$('.isClick');
                     ele.children().bind('click',function(e){
                         console.log(scope.tableData[$(this).parent().attr('data-value')])
                         scope.tqqClick()(scope.tableData[$(this).parent().attr('data-value')],$(this).parent().attr('data-title'),$(this).parent().attr('data-value'))
                         scope.$apply();
                     })
             },200)
         },
        template: '<table class="table"> ' +
        '<thead> ' +
        '<tr> ' +
        '<th ng-repeat="data in tableTitle track by $index" ng-if="!data.defaultHide" class="text-center">{{data.name}}</th> ' +
        '</tr> ' +
        '</thead> ' +
        '<tbody> ' +
        '<tr ng-repeat="(key,value) in tableData track by $index" class="pointer"  ng-class="{checkedNo:!tableChecked[key],checkedYes:tableChecked[key]}"> ' +
        '<td ng-repeat="title in tableTitle track by $index" class="isClick" ng-if="!title.defaultHide" ng-bind-html="value|crateHtml:title | toHtml" data-value="{{key}}" data-title="{{title.judge}}"></td> ' +
        '</tr> ' +
        '</tbody> ' +
        '</table> '
    };
}).filter('crateHtml',["$filter", function($filter){
        function getObjInit(obj,attr){ //第一个差数是obj,第二个参数是属性段，会读取数obj对应的属性段的值。
            var arr=attr.split('.')
            try{
                if(angular.isArray(arr)){
                    var len= arr.length;
                    switch (len){
                        case 0:return null;
                            break;
                        case 1:return obj[arr[0]] || '';
                            break;
                        case 2:return obj[arr[0]][arr[1]] || '';
                            break;
                        case 3:return obj[arr[0]][arr[1]][arr[2]] || '';
                            break;
                        case 4:return obj[arr[0]][arr[1]][arr[2]][arr[3]] || '';
                            break;
                        case 5:return obj[arr[0]][arr[1]][arr[2]][arr[3]][arr[4]] || '' ;
                    }
                }else{
                    throw '解析字段时出错';
                }
            }catch(ev){
                return '';
            }
        };
        function getDataOrFalse(obj,attr){
            var _filterArr,_fieldAttr,_isF,_flen;
            _isF=attr.split('|');
            _fieldAttr=_isF[0];
            _filterArr=_isF[1].split(':');
            _flen=_filterArr.length;
            angular.forEach(_filterArr,function(ev,key){
                if(key>0 &&(ev.substr(0,1)==='\'' || ev.substr(0,1)==='\"') && (ev.substr(-1,1)==='\'' || ev.substr(-1,1)==='\"')){
                    _filterArr[key]= ev.slice(1,-1);
                }else if(key>0){
                    _filterArr[key]=getObjInit(obj,ev)
                }
            })
            try{$filter(_filterArr[0])}catch(ev){throw _filterArr[0]+'的filter没有定义'};
            switch (_flen){
                case 1:return $filter(_filterArr[0])(getObjInit(obj,_fieldAttr));
                    break;
                case 2:return $filter(_filterArr[0])(getObjInit(obj,_fieldAttr),_filterArr[1]);
                    break;
                case 3:return $filter(_filterArr[0])(getObjInit(obj,_fieldAttr),_filterArr[1],_filterArr[2]);
                    break;
                case 4:return $filter(_filterArr[0])(getObjInit(obj,_fieldAttr),_filterArr[1],_filterArr[2],_filterArr[3]);
                    break;
                case 5:return $filter(_filterArr[0])(getObjInit(obj,_fieldAttr),_filterArr[1],_filterArr[2],_filterArr[3],_filterArr[4]);
                    break;
                default:return  '<i style="color:red">no \"filter\"</i>'
            };
        };
        function returnHtml(htmlNodeSting,data){//第一个参数是field属性的值，第二个是这个td指令的数据。
            if(htmlNodeSting.substr(0,1)==='<' && (htmlNodeSting.substr(-1,2)==="/>" || htmlNodeSting.substr(-1,1)===">")){//判断是标签，直接返回；
                return htmlNodeSting;
            }else if((htmlNodeSting.substr(0,1)==='\'' || htmlNodeSting.substr(0,1)==='\"') && (htmlNodeSting.substr(-1,1)==='\'' || htmlNodeSting.substr(-1,1)==='\"')){//判断是带"或'的，当字符串处理，直接返回
                return htmlNodeSting.slice(1,-1);
            }else{ //否则是当变量处理，还有可能带filter过滤器的。
                return (function(key,data){
                    var _isFilter;
                    var _key=key.replace(/(^\s+)|(\s+$)|(\s+)/g,"")
                    _isFilter=_key.split('|');//将field属性切割成两段，第一段是xx.xx.xx的取值属性，第二段是filter的使用，
                    if(_isFilter.length>1){//这里是字段有filter的情况。
                        return getDataOrFalse(data,_key)
                    }else{//这里是直接就只有字段的情况。
                        return getObjInit(data,_isFilter[0]);
                    }
                    //return key;
                })(htmlNodeSting,data)
            }
        }
        function createHtml(tdData,keys){//创建html
            if(keys){
                if(angular.isArray(keys)) {
                    return (function (data, key) {
                        var _htmlNode=[];
                        angular.forEach(key,function(ev){
                            _htmlNode.push(returnHtml(ev.node,data))
                        });
                        return _htmlNode.join('');
                    })(tdData, keys)
                }else if(angular.isString(keys)) {
                    return returnHtml(keys,tdData) || "";
                }
            }else{
                return '<span style="color:red">no "field" </span>';
            }
        }
    return function(obj,title){
        var _string;
        if(angular.isString(title.field) && title.class){
            _string='<div class="'+title.class+'">'+createHtml(obj,title.field)+'</div>';
        }else if(angular.isString(title.field) && !(title.judge && title.field.substr(0,1)==='< '&& title.field.substr(-1,1)==='>')){
            _string='<div>'+createHtml(obj,title.field)+'</div>';
        }else{_string=createHtml(obj,title.field)}
        return _string;
    }
}])


/**
 * Created by Administrator on 2016/3/13.
 */
var ser = angular.module('ui.service',[]);
//路由数据处理方法
ser.provider('stateInit',function(){
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
            };
            _obj.url =  '/' + _level[_len-1];
            _obj.controller = this.ctrlInit(obj.name);
            _obj.templateUrl = baseUrl +obj.viewUrl + _level[_len-1]+'.html'
        }
        return _obj;
    }
    this.$get=function(){
        return {}
    }
});
//$http封装...
ser.service('myHttp',["$q", "$http", "apiUrl", "$timeout", "$state", function($q,$http,apiUrl,$timeout,$state){
    function http(type,url,data,message){
        var pr=$q.defer();
        var objData={
             method:type,
            url:apiUrl+url,
            cache:false,
            data:type=='POST' || type=='PUT' || type=='DELETE' ?data:null,
            params:type=='GET'?data:null
        }
        if(type=='DELETE') {
            objData.headers = {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
            objData.transformRequest=function(data){
                var param = function (obj) {
                    var query = '';
                    var name, value, fullSubName, subName, subValue, innerObj, i;
                    for (name in obj) {
                        value = obj[name];
                        if (value instanceof Array) {
                            for (i = 0; i < value.length; ++i) {
                                subValue = value[i];
                                fullSubName = name + '[' + i + ']';
                                innerObj = {};
                                innerObj[fullSubName] = subValue;
                                query += param(innerObj) + '&';
                            }
                        } else if (value instanceof Object) {
                            for (subName in value) {
                                subValue = value[subName];
                                fullSubName = name + '[' + subName + ']';
                                innerObj = {};
                                innerObj[fullSubName] = subValue;
                                query += param(innerObj) + '&';
                            }
                        } else if (value !== undefined && value !== null) {
                            query += encodeURIComponent(name) + '='
                                + encodeURIComponent(value) + '&';
                        }
                    }
                    return query.length ? query.substr(0, query.length - 1) : query;
                };
                return angular.isObject(data) && String(data) !== '[object File]'
                    ? param(data)
                    : data;
            }
        }
        $http(objData).success(function(data,code){
            if(data.res=='SUCCESS' || data.res==true){
                pr.resolve(data)
                if(message){
                   alert(message)
                }
            }else if(data.res=='FAILED'){
                pr.reject(data)
                if(!data.error.code){
                    alert('返回信息符合规则，超出预料范围，请联系程序员！');
                    console.log(data);
                    return;
                }
                switch(data.error.code){
                    case '20304':
                        alert(data.error.message)
                        $timeout(function(){
                            $state.go('login')
                            sessionStorage.clear();
                        },1000)
                        break;
                    case '20305':
                       alert(data.error.message)
                        $timeout(function(){
                           $state.go('login')
                            sessionStorage.clear();
                        },1000)
                        break;
                    case '10008':
                       alert(data.error.message);
                        break;
                    default :
                        alert(data.error.message);
                        break;
                }
            }else{
                alert('返回数据异常，请联系程序员！')
                console.log(data)
            }
        }).error(function(data,code){
            alert('HTTP请求错误，请F5刷新或联系开发人员')
            console.log('HTTP错误：'+code)
            console.log(data)
        });
        return pr.promise;
    };
    return http;
}])
.filter('toStatus',function(){
    return function(){
        //console.log(arguments)
    }
})
    .filter('toPhone',function(){
        return function(){
             //console.log('这里是变量的'+arguments[1])
        }
    })
/**
 * Created by Administrator on 2016/3/13.
 */
app.controller('AdminBranchController',["$scope", "branchApi", function($scope,branchApi){
   /* branchApi.getList().then(function(data){
        $scope.listData=data.data
        console.log(data)
    },function(error){
        console.log(error)
    })*/
    $scope.filterData={
        'sjfj':'选项一',
        'asd':'选项二',
        '123':'选项三',
    }
    $scope.listData={
        data:[
            {branchId:'md002',name:'门店',managePer:{name:'小A'},tel:'14874634475',address:'这里是地址'},
            {branchId:'md003',name:'XX店',managePer:{name:'小W'},tel:'13545456565',address:'YOU地址'},
            {branchId:'md004',name:'YY店',managePer:{name:'小E'},tel:'18598457564',address:'LIme地址'},
            {branchId:'md005',name:'DD店',managePer:{name:'小T'},tel:'18545459989',address:'address'},
            {branchId:'md005',name:'DD店',managePer:{name:'小T'},tel:'18545459989',address:'address'},
            {branchId:'md005',name:'DD店',managePer:{name:'小T'},tel:'18545459989',address:'address'},
            {branchId:'md005',name:'DD店',managePer:{name:'小T'},tel:'18545459989',address:'address'},
            {branchId:'md005',name:'DD店',managePer:{name:'小T'},tel:'18545459989',address:'address'},
            {branchId:'md005',name:'DD店',managePer:{name:'小T'},tel:'18545459989',address:'address'},
            {branchId:'md005',name:'DD店',managePer:{name:'小T'},tel:'18545459989',address:'address'},
        ]
    }
    $scope.title=[
        {name:'多选',lock:true,field:'<div class="checkCtrl"></div>',judge:'CHECKED'},
        {name:'门店编号',defaultHide:false,lock:true,field:'branchId',judge:'SHOW',class:'text-primary'},
        {name:'门店名称',lock:true,field:'name'},
        {name:'负责人',defaultHide:true,lock:true,field:'managePer.name'},
        {name:'门店电话',lock:true,field:'tel',judge:'eddk'},
        {name:'门店地址',lock:true,field:'address',class:'width-100 omit'},
        {name:'门店类型',lock:false,field:'branchType | toStatus:"BRANCH_TYPE"'},
        {name:'经营状态',defaultHide:false,lock:false,field:'status|toStatus:BRANCH_STATUS'},
        {name:'分配员工',lock:true,field:'"<a class="edit">分配员工</a>"',judge:'STAFF'},
        {name:'项目管理',lock:true,field:[
            {node:'<div class="edit">项目管理</div>',judge:''},
        ]},
        {name:'操作',defaultHide:true,show:true,field:[
            {node:'<button class="btn btn-xs btn-primary border-radius-none" title="编辑"><i class="glyphicon glyphicon-edit"></i></button>',judge:'EDIT'},
            {node:'<button class="btn btn-xs btn-danger border-radius-none" title="删除"><i class="glyphicon glyphicon-trash"></i></button>',judge:'DELETE'}
        ]},
    ];
    $scope.checkModel=[true]
    $scope.operation=function(data,judge,index) {
        console.log(arguments)
        switch (judge) {
            case 'CHECKED':
                 $scope.checkModel[index] = !$scope.checkModel[index]
                break;
            case 'SHOW':
                $scope.listData.data[index].name='1231231'
                break;
        }
    }
}]);
app.controller('AdminBranchShowController',["$scope", function($scope){

}]);
app.controller('AdminBranchAddController',["$scope", function($scope){

}]);
app.controller('AdminBranchEditController',["$scope", function($scope){

}]);
/**
 * Created by Administrator on 2016/4/5.
 */
app.factory('branchApi',["myHttp", function(myHttp){
    var apiObj={};
    apiObj.getList=function(data){
        return myHttp('GET','branch',data);
    }
     return apiObj;
}])
/**
 * Created by Administrator on 2016/3/23.
 */
/*
app.controller('AdminController',function($scope,menuData,$http,$state){
    if(!sessionStorage.getItem('auth_token')){
        $state.go('login')
    }
    $scope.menuData=menuData;
    $http.defaults.headers.common['auth_token']=sessionStorage.getItem('auth_token');
})*/

/**
 * Created by Administrator on 2016/3/23.
 */
 /*app.controller('LoginController',function($scope,$state,myHttp){
  $scope.data={};
   $scope.login=function(){
     myHttp('POST','login',$scope.data,'登录成功').then(function(data){
      console.log(data)
      var _obj = JSON.stringify(data.data)
      sessionStorage.setItem('auth_token',_obj)
      $state.go('admin.branch')
     })
   }
})*/