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
})