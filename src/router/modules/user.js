import Main from '@/view/main'

/**
 * 用户管理
 */
export default [
  {
    path: '/usersManagement',
    name: 'usersManagement',
    meta: { title: '用户管理', icon: 'person-stalker' },
    component: Main,
    children: [

      // 城市合伙人
      {
        path: '/partnerList',
        name: 'partnerList',
        meta: { title: '城市合伙人', icon: 'person-stalker' },
        component: () => import('@/view/partner/partnerList')
      },
      {
        path: '/partnerAdd',
        name: 'partnerAdd',
        meta: { hideInMenu: true },
        component: () => import('@/view/partner/partnerAdd')
      },
      {
        path: '/partnerCheck',
        name: 'partnerCheck',
        meta: { hideInMenu: true },
        component: () => import('@/view/partner/partnerCheck')
      },
      // {
      //   path: '/store-online-share',
      //   name: 'store-online-share',
      //   meta: {
      //     title: '商家线上订单分润',
      //     icon: 'connection-bars'
      //   },
      //   component: () => import('@/view/partner/store-online-share')
      // },

      // {
      //   path: '/qd-gy-share',
      //   name: 'qd-gy-share',
      //   meta: {
      //     title: '供应链分润',
      //     icon: 'connection-bars'
      //   },
      //   component: () => import('@/view/partner/qd-gy-share')
      // }

      // 渠道合伙人
      {
        path: '/channelPartnerList',
        name: 'channelPartnerList',
        meta: { title: '渠道合伙人', icon: 'person-stalker' },
        component: () => import('@/view/partnerChannel/partnerList')
      },
      {
        path: '/channelPartnerAdd',
        name: 'channelPartnerAdd',
        meta: { hideInMenu: true },
        component: () => import('@/view/partnerChannel/partnerAdd')
      },
      {
        path: '/channelPartnerCheck',
        name: 'channelPartnerCheck',
        meta: { hideInMenu: true },
        component: () => import('@/view/partnerChannel/partnerCheck')
      },

      // {
      //   path: '/directlyChannelPartnerManager',
      //   name: 'directlyChannelPartnerManager',
      //   meta: {title: '直属渠道合伙人',icon: 'person-stalker'},
      //   component: parentView,
      //   children: [
      //     {
      //       path: '/channelPartnerListDirectly',
      //       name: 'channelPartnerListDirectly',
      //       meta: { title: '直属渠道合伙人', icon: 'person-stalker' },
      //       component: () => import('@/view/partnerChannelDirectly/partnerList')
      //     },
      //     {
      //       path: '/channelPartnerAddDirectly',
      //       name: 'channelPartnerAddDirectly',
      //       meta: { hideInMenu: true },
      //       component: () => import('@/view/partnerChannelDirectly/partnerAdd')
      //     },
      //     {
      //       path: '/channelPartnerCheckDirectly',
      //       name: 'channelPartnerCheckDirectly',
      //       meta: { hideInMenu: true },
      //       component: () => import('@/view/partnerChannelDirectly/partnerCheck')
      //     }
      //   ]
      // },

      // 业务员
      {
        path: '/salesManList',
        name: 'salesManList',
        meta: { title: '业务员', icon: '_user-tie' },
        component: () => import('@/view/salesMan/salesManList')
      },
      {
        path: '/salesManAdd',
        name: 'salesManAdd',
        meta: { hideInMenu: true },
        component: () => import('@/view/salesMan/salesManAdd')
      },
      {
        path: '/salesManCheck',
        name: 'salesManCheck',
        meta: { hideInMenu: true },
        component: () => import('@/view/salesMan/salesManCheck')
      },

      // 商户
      {
        path: '/merchants',
        name: 'merchants',
        meta: { title: '商户', icon: '_gongwenbao' },
        component: () => import('@/view/merchant/index')
      }
    ]
  }
]
