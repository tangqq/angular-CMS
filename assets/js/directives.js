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
        scope:{
            tableData:'=',
            tdClick:'&',
            tableTitle:'=',
            checkbox:'='
        },
        controller:function($scope){
            this.thisClick= $scope.tdClick();
        },
        template:'<div class="table-responsive"> ' +
        '<table class="table table-hover text-center"> ' +
        '<thead> ' +
        '<tr> ' +
        '<th ng-repeat="data in tableTitle track by $index" ng-if="data.init" class="text-center">{{data.name}}</th> ' +
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
.directive('tableTd',function($filter){
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
});