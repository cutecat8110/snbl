import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/front/Index.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/front/Home.vue')
      },
      {
        path: 'products',
        component: () => import('@/views/front/Products.vue')
      },
      {
        path: 'products/:id',
        component: () => import('@/views/front/Products.vue')
      },
      {
        path: 'product/:id',
        component: () => import('@/views/front/Product.vue')
      },
      {
        path: 'cart',
        component: () => import('@/views/front/Cart.vue'),
        children: [
          {
            path: '',
            component: () => import('@/views/front/CartCheckOut.vue')
          },
          {
            path: 'add',
            component: () => import('@/views/front/CartAdd.vue')
          }
        ]
      },
      {
        name: 'cart-completed',
        path: 'order/:id',
        component: () => import('@/views/front/CartCompleted.vue')
      },
      {
        path: 'story',
        component: () => import('@/views/front/Story.vue')
      },
      {
        path: 'try-free',
        component: () => import('@/views/front/TryFree.vue')
      },
      {
        path: 'vip',
        component: () => import('@/views/front/Vip.vue')
      },
      {
        path: 'qa',
        component: () => import('@/views/front/Qa.vue')
      },
      {
        path: 'shopping-process',
        component: () => import('@/views/front/ShoppingProcess.vue')
      },
      {
        path: 'policy',
        component: () => import('@/views/front/Policy.vue')
      },
      {
        path: 'payment-delivery',
        component: () => import('@/views/front/PaymentDelivery.vue')
      },
      {
        path: 'terms',
        component: () => import('@/views/front/Terms.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/back/Login.vue')
  },
  {
    path: '/admin',
    component: () => import('@/views/back/Dashboard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('@/views/back/Products.vue')
      },
      {
        path: 'product/:id',
        component: () => import('@/views/back/Product.vue')
      },
      {
        path: 'orders',
        component: () => import('@/views/back/Orders.vue')
      },
      {
        path: 'coupons',
        component: () => import('@/views/back/Coupons.vue')
      },
      {
        path: 'article',
        component: () => import('@/views/back/Article.vue')
      },
      {
        path: 'articles',
        component: () => import('@/views/back/Articles.vue')
      },
      {
        path: 'articles',
        component: () => import('@/views/back/Articles.vue')
      },
      {
        path: 'cart',
        component: () => import('@/views/back/Cart.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { left: 0, top: 0, behavior: 'instant' }
  },
  linkExactActiveClass: 'active'
})

export default router
