/**
 * Created by Administrator on 2016/3/11.
 */
angular.module('ui.directives',[]).filter('toHtml',function($sce){
    return function(data){
        return $sce.trustAsHtml(data);
    }
})
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
}).filter('crateHtml',function($filter){
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
})

