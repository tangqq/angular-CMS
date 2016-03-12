/**
 * Created by Administrator on 2016/2/27.
 */
app.constant('menuData',[
    {first:{
        icon:'glyphicon glyphicon-home',
        name:'门店管理',
        url:null,
    },
        second:[
            {icon:'glyphicon glyphicon-home',name:'门店管理',url:'admin.branch'},
            {icon:'glyphicon glyphicon-home',name:'工位管理',url:'admin.branch-show'},
        ]
    },
    {first:{
        icon:'glyphicon glyphicon-user',
        name:'员工管理',
        url:null,
    },
        second:[
            {icon:'',name:'员工列表',url:'admin.staff'},
        ]
    },
    {first:{
        icon:'glyphicon glyphicon-tasks',
        name:'商品模板',
        url:null,
    },
        second:[
            {icon:'',name:'项目模板',url:'admin.project'},
        ]
    },
    {first:{
        icon:'glyphicon glyphicon-tasks',
        name:'商品管理',
        url:null,
    },
        second:[
            {icon:'',name:'商品管理',url:'admin.goods'},
        ]
    },
    {first:{
        icon:'glyphicon glyphicon-list-alt',
        name:'交易管理',
        url:null,
    },
        second:[
            {icon:'',name:'订单列表',url:'admin.order'}
        ]
    },

])