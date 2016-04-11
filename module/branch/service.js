/**
 * Created by Administrator on 2016/4/5.
 */
app.factory('branchApi',function(myHttp){
    var apiObj={};
    apiObj.getList=function(data){
        return myHttp('GET','branch',data);
    }
     return apiObj;
})