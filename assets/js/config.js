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