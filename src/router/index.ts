import { createRouter, createWebHistory } from 'vue-router';
import getPageTitle from '../utils/page-title';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const router = createRouter({
  routes: [
    { path: '/', component: () => import('../pages/index.vue') },
    { path: '/inbox', component: () => import('../pages/inbox.vue') },
    { path: '/customers', component: () => import('../pages/customers.vue') },
    { path: '/pedidos', component: () => import('../pages/pedidos.vue') },
    {
      path: '/settings',
      component: () => import('../pages/settings.vue'),
      children: [
        { path: '', component: () => import('../pages/settings/index.vue') },
        {
          path: 'members',
          component: () => import('../pages/settings/members.vue'),
        },
        {
          path: 'notifications',
          component: () => import('../pages/settings/notifications.vue'),
        },
        {
          path: 'security',
          component: () => import('../pages/settings/security.vue'),
        },
      ],
    },
  ],
  history: createWebHistory(),
});

router.beforeEach((_to: any, _from, next) => {
  document.title = getPageTitle(_to.meta.title);
  NProgress.start()
  next();
});

router.afterEach(() => {
  NProgress.done()
})

export default router;
