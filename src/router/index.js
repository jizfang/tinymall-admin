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
      icon: 'goods'
    },
    children: [{
        path: 'list',
        component: () => import('@/views/order/order'),
        name: 'orderList',
        meta: {
          title: '订单列表',
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
