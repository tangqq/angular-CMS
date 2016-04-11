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
ser.service('myHttp',function($q,$http,apiUrl,$timeout,$state){
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
})
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