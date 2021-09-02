import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Front',
    component: () => import('@/views/front/Index.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/front/Home.vue'),
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('@/views/front/Products.vue'),
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('@/views/front/Cart.vue'),
      },
    ],
  },
  {
    path: '/admin',
    name: 'Back',
    component: () => import('@/views/back/Admin.vue'),
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('@/views/back/Login.vue'),
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/back/Dashboard.vue'),
        children: [
          {
            path: '',
            name: 'BackProducts',
            component: () => import('@/views/back/BackProducts.vue'),
          },
        ],
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
