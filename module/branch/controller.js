/**
 * Created by Administrator on 2016/3/13.
 */
app.controller('AdminBranchController',function($scope,branchApi){
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
});
app.controller('AdminBranchShowController',function($scope){

});
app.controller('AdminBranchAddController',function($scope){

});
app.controller('AdminBranchEditController',function($scope){

});