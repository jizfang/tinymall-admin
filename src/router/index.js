import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  }
]


export const asyncRoutes = [
  {
    path: '/user',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'userManage',
    meta: {
      title: '用户管理',
      icon: 'user'
    },
    children: [
      {
      path: 'list',
      component: () => import('@/views/user/user'),
      name: 'list',
      meta: {
        title: '用户列表',
        noCache: true
      }
    },
    {
      path: 'address',
      component: () => import('@/views/user/address'),
      name: 'address',
      meta: {
        title: '地址列表',
        noCache: true
      }
    }
  ]
  },
  {
    path: '/ad',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'adManage',
    meta: {
      title: '广告管理',
      icon: 'edit'
    },
    children: [{
        path: 'index',
        component: () => import('@/views/ad/index'),
        name: 'index',
        meta: {
          title: '广告列表',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/goods',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'goodsManage',
    meta: {
      title: '商品管理',
      icon: 'goods'
    },
    children: [{
        path: 'list',
        component: () => import('@/views/goods/list'),
        name: 'goodsList',
        meta: {
          title: '商品列表',
          noCache: true
        }
      }, {
        path: 'create',
        component: () => import('@/views/goods/create'),
        name: 'goodsCreate',
        meta: {
          perms: ['POST /admin/goods/create'],
          title: '新增商品',
          noCache: true
        }
      }, {
        path: 'edit',
        component: () => import('@/views/goods/edit'),
        name: 'goodsEdit',
        meta: {
          title: '商品编辑',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'category',
        component: () => import('@/views/goods/category'),
        name: 'category',
        meta: {
          //perms: ['GET /admin/goods/detail', 'POST /admin/goods/update', 'POST /admin/goods/catAndBrand'],
          title: '商品分类管理',
          noCache: true
        }
      }, {
        path: 'brand',
        component: () => import('@/views/goods/brand'),
        name: 'brand',
        meta: {
          //perms: ['GET /admin/goods/detail', 'POST /admin/goods/update', 'POST /admin/goods/catAndBrand'],
          //icon: 'brand',
          title: '商品品牌管理',
          noCache: true
        }
      },
      {
        path: 'comment',
        component: () => import('@/views/goods/comment'),
        name: 'goodsComment',
        meta: {
          perms: ['GET /admin/comment/list', 'POST /admin/comment/delete'],
          title: '商品评论',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/template',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'templateManage',
    meta: {
      title: '规格参数模板',
      icon: 'goods'
    },
    children: [{
        path: 'list',
        component: () => import('@/views/goods/template'),
        name: 'templateList',
        meta: {
          title: '规格参数',
          noCache: true
        }
      },
      {
        path: 'specList',
        component: () => import('@/views/goods/spec'),
        name: 'specList',
        meta: {
          title: '规格列表',
          noCache: true
        }
      },
      {
        path: 'specEdit',
        component: () => import('@/views/goods/specEdit'),
        name: 'specEdit',
        meta: {
          title: '规格编辑',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'paraList',
        component: () => import('@/views/goods/para'),
        name: 'paraList',
        meta: {
          title: '参数列表',
          noCache: true
        }
      },
      {
        path: 'paraEdit',
        component: () => import('@/views/goods/paraEdit'),
        name: 'paraEdit',
        meta: {
          title: '参数编辑',
          noCache: true
        },
        hidden: true
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'orderManage',
    meta: {
      title: '订单管理',
      icon: 'shopping'
    },
    children: [{
        path: 'list',
        component: () => import('@/views/order/order'),
        name: 'orderList',
        meta: {
          title: '订单列表',
          noCache: true
        }
      },
      {
        path: 'coupon',
        component: () => import('@/views/order/coupon'),
        name: 'coupon',
        meta: {
          title: '优惠券列表',
          noCache: true
        }
      },
      {
        path: 'couponDetail',
        component: () => import('@/views/order/couponDetail'),
        name: 'couponDetail',
        meta: {
          title: '优惠券详情',
          noCache: true
        },
        hidden: true
      }, {
        path: 'topic',
        component: () => import('@/views/order/topic'),
        name: 'topic',
        meta: {
          perms: ['GET /admin/topic/list', 'POST /admin/topic/create', 'GET /admin/topic/read', 'POST /admin/topic/update', 'POST /admin/topic/delete'],
          title: '专题管理',
          noCache: true
        }
      }, {
        path: 'topic-create',
        component: () => import('@/views/order/topicCreate'),
        name: 'topicCreate',
        meta: {
          perms: ['POST /admin/topic/create'],
          title: '专题创建',
          noCache: true
        },
        hidden: true
      }, {
        path: 'topic-edit',
        component: () => import('@/views/order/topicEdit'),
        name: 'topicEdit',
        meta: {
          perms: ['GET /admin/topic/read', 'POST /admin/topic/update'],
          title: '专题编辑',
          noCache: true
        },
        hidden: true
      }, {
        path: 'groupon-rule',
        component: () => import('@/views/order/grouponRule'),
        name: 'grouponRule',
        meta: {
          perms: ['GET /admin/groupon/list', 'POST /admin/groupon/create', 'POST /admin/groupon/update', 'POST /admin/groupon/delete'],
          title: '团购规则',
          noCache: true
        }
      }, {
        path: 'groupon-activity',
        component: () => import('@/views/order/grouponActivity'),
        name: 'grouponActivity',
        meta: {
          perms: ['GET /admin/groupon/listRecord'],
          title: '团购活动',
          noCache: true
        }
      }
    ]
  }, 
  {
    path: '/sys',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'sysManage',
    meta: {
      title: '系统管理',
      icon: 'systemManage'
    },
    children: [
      {
        path: 'generator',
        component: () => import('@/views/generator'),
        name: 'generatoreList',
        meta: {
          title: '代码生成',
          noCache: true
        }
      },
      {
        path: 'wx',
        component: () => import('@/views/sys/wx'),
        name: 'wx',
        meta: {
          title: '微信列表',
          noCache: true
        }
      },
      {
        path: 'region',
        component: () => import('@/views/sys/region'),
        name: 'region',
        meta: {
          title: '区域列表',
          noCache: true
        }
      }, 
      {
        path: 'admin',
        component: () => import('@/views/sys/admin'),
        name: 'admin',
        meta: {
          title: '管理员',
          noCache: true
        }
      }, 
      {
        path: 'role',
        component: () => import('@/views/sys/role'),
        name: 'role',
        meta: {
          title: '角色管理',
          noCache: true
        }
      }, 
      {
        path: 'storage',
        component: () => import('@/views/sys/storage'),
        name: 'storage',
        meta: {
          title: '对象存储',
          noCache: true
        }
      }
  ]
  },
  {
    path: 'external-link',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'externalLink',
    meta: {
      title: '外链',
      icon: 'link'
    },
    children: [{
        path: 'https://cloud.tencent.com/product/cos',
        meta: {
          title: '腾讯云存储',
          icon: 'link'
        }
      },
      {
        path: 'https://cloud.tencent.com/product/sms',
        meta: {
          title: '腾讯云短信',
          icon: 'link'
        }
      },
      {
        path: 'https://pay.weixin.qq.com/index.php/core/home/login',
        meta: {
          title: '微信支付',
          icon: 'link'
        }
      },
      {
        path: 'https://mpkf.weixin.qq.com/',
        meta: {
          title: '小程序客服',
          icon: 'link'
        }
      },
      {
        path: 'https://www.alibabacloud.com/zh/product/oss',
        meta: {
          title: '阿里云存储',
          icon: 'link'
        }
      },
      {
        path: 'https://www.qiniu.com/products/kodo',
        meta: {
          title: '七牛云存储',
          icon: 'link'
        }
      },
      {
        path: 'http://www.kdniao.com/api-track',
        meta: {
          title: '快递鸟',
          icon: 'link'
        }
      }
    ],
    hidden: true
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
