/**
 * Created by Administrator on 2016/3/13.
 */
app.controller('AdminBranchController',function($scope){
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
});
app.controller('AdminBranchShowController',function($scope){

});
app.controller('AdminBranchAddController',function($scope){

});
app.controller('AdminBranchEditController',function($scope){

});