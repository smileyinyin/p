import Main from '@/view/main'

import member from './modules/member';
import merchant from './modules/merchant';
import user from './modules/user';
import pos from './modules/pos';
import financial from './modules/financial';
import bank from './modules/bank';
import personalCenter from './modules/personalCenter';
import help from './modules/help';

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *        若使用 svg icon 需要在 icon 名前加 'svg_' 前缀
 *  hide: 设为 true 则不会在 面包屑导航中 出现路径
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  // {
  //   path: '/',
  //   redirect: { name: 'home' },
  //   component: Main,
  //   meta: {
  //     notCache: true,
  //   },
  //   children: [
  //     {
  //       path: '/home',
  //       name: 'home',
  //       meta: {
  //         icon: 'ios-home',
  //         title: '首页'
  //       },
  //       component: () => import('@/view/home/home')
  //     }
  //   ]
  // },
  /************* ↑ 上面显示 home ↑ **************/
  // TODO 隐藏/显示home
  /************* ↓ 下面隐藏 home ↓ **************/
  {
    path: '/',
    redirect: { name: 'userManger' },
    component: Main,
    meta: {
      notCache: true,
      hideInMenu: true
    },
    children: [
      {
        path: '/home',
        redirect: { name: 'userManger' },
        name: 'home',
        meta: {
          icon: 'ios-home',
          title: '首页'
        },
        component: () => import('@/view/home/home')
      }
    ]
  },

  ...member,
  ...merchant,
  ...user,
  ...pos,
  ...financial,
  ...bank,           // 银行基础数据
  ...personalCenter,
  ...help,

  // 流水管理（活动交易）
  // {
  //   path: '/tradingActivities',
  //   name: 'tradingActivities',
  //   meta: {
  //     title:'流水管理',
  //     icon: '_bokuanmingxi'
  //   },
  //   component: Main,
  //   children: [
  //     // {
  //     //   path: '/pos',
  //     //   name: 'pos',
  //     //   meta: {
  //     //     title: 'pos机交易流水',
  //     //     icon: 'arrow-graph-up-right'
  //     //   },
  //     //   component: () => import('@/view/trading/pos')
  //     // },
     

  //   ]
  // },
  
  // {
  //   path: '/machineManagement',
  //   name: 'machineManagement',
  //   component: Main,
  //   meta: { title: '机具管理', icon: 'settings' },
  //   children: [
  //     {
  //       path: '/posManager',
  //       name: 'posManager',
  //       meta: {
  //         title: 'pos机管理',
  //         icon: 'settings'
  //       },
  //       component: () => import('@/view/machine/posManager')
  //     },
  //     {
  //       path: '/posWarehousing',
  //       name: 'posWarehousing',
  //       meta: {
  //         title: 'pos机库存',
  //         icon: 'settings'
  //       },
  //       component: () => import('@/view/machine/posWarehousing')
  //     },
  //     // {
  //     //   path: '/posDownPicking',
  //     //   name: 'posDownPicking',
  //     //   meta: {
  //     //     title: 'pos机库存',
  //     //     icon: 'settings'
  //     //   },
  //     //   component: () => import('@/view/machine/posDownPicking')
  //     // },
  //     {
  //       path: '/posSetDownRecord',
  //       name: 'posSetDownRecord',
  //       meta: {
  //         title: 'pos机下拨记录',
  //         icon: 'settings'
  //       },
  //       component: () => import('@/view/machine/posSetDownRecord')
  //     },
  //     {
  //       path: '/posBackRecord',
  //       name: 'posBackRecord',
  //       meta: {
  //         title: 'pos机回拨记录',
  //         icon: 'settings'
  //       },
  //       component: () => import('@/view/machine/posBackRecord')
  //     }
  //   ]
  // },
  // {
  //   path: '/orderManagement',
  //   name: '订单管理',
  //   meta: {
  //     title: '订单管理',
  //     icon: 'clipboard'
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: '/store-user',
  //       name: 'store-user',
  //       meta: {
  //         title: '商家自提订单',
  //         icon: '_dingdan'
  //       },
  //       component: () => import('@/view/order/store-user.vue')
  //     },
  //     {
  //       path: '/see-order',
  //       name: 'see-order',
  //       meta: {
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/order/see-order.vue')
  //     },
  //     {
  //       path: '/tiyan-order',
  //       name: 'tiyan-order',
  //       meta: {
  //         title: '体验店自提订单',
  //         icon: '_dingdan'
  //       },
  //       component: () => import('@/view/order/tiyan-order.vue')
  //     },
  //     {
  //       path: '/see-tiyan-order',
  //       name: 'see-tiyan-order',
  //       meta: {
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/order/see-tiyan-order.vue')
  //     },
  //     {
  //       path: '/ty-online-order',
  //       name: 'ty-online-order',
  //       meta: {
  //         title: '体验店线上订单',
  //         icon: '_dingdan'
  //       },
  //       component: () => import('@/view/order/ty-online-order')
  //     },
  //     {
  //       path: '/see-online-order',
  //       name: 'see-online-order',
  //       meta: {
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/order/see-online-order.vue')
  //     },
  //     {
  //       path: '/see-gy-order',
  //       name: 'see-gy-order',
  //       meta: {
  //         title: '供应链订单列表',
  //         icon: '_dingdan'
  //       },
  //       component: () => import('@/view/order/see-gy-order')
  //     }
  //   ]
  // },
  // {
  //   path: '/goodsManagement',
  //   name: 'goodsManagement',
  //   component: Main,
  //   children: [
  //     {
  //       path: '/goods',
  //       name: 'goods',
  //       meta: {
  //         title: '商品管理',
  //         icon: '_shangpinkucun'
  //       },
  //       component: () => import('@/view/goods/goods.vue')
  //     },
  //     {
  //       path: '/add-goods',
  //       name: 'add-goods',
  //       meta: {
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/goods/add-goods.vue')
  //     },
  //     {
  //       path: '/no-edit-goods',
  //       name: 'no-edit-goods',
  //       meta: {
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/goods/no-edit-goods.vue')
  //     },
  //     {
  //       path: '/edit-goods',
  //       name: 'edit-goods',
  //       meta: {
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/goods/edit-goods.vue')
  //     },
  //     {
  //       path: '/see-goods',
  //       name: 'see-goods',
  //       meta: {
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/goods/see-goods.vue')
  //     },
  //   ]
  // },

  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }


]
