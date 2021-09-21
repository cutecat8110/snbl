import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/views/front/Index.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/front/Home.vue'),
      },
      {
        path: 'products',
        component: () => import('@/views/front/Products.vue'),
      },
      {
        path: 'cart',
        component: () => import('@/views/front/Cart.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/back/Login.vue'),
  },
  {
    path: '/admin',
    component: () => import('@/views/back/Dashboard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('@/views/back/Products.vue'),
      },
      {
        path: 'Product/:id',
        component: () => import('@/views/back/Product.vue'),
      },
      {
        path: 'orders',
        component: () => import('@/views/back/Orders.vue'),
      },
      {
        path: 'coupons',
        component: () => import('@/views/back/Coupons.vue'),
      },
      {
        path: 'article',
        component: () => import('@/views/back/Article.vue'),
      },
      {
        path: 'articles',
        component: () => import('@/views/back/Articles.vue'),
      },
      {
        path: 'articles',
        component: () => import('@/views/back/Articles.vue'),
      },
      {
        path: 'cart',
        component: () => import('@/views/back/Cart.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkExactActiveClass: 'active',
});

export default router;
