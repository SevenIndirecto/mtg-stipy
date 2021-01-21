import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '@/views/Home.vue';
import Room from '@/views/Room.vue';
import { auth } from '@/helpers/firebase';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: Home,
    meta: {
      requiresAuth: true,
    },
    name: 'home',
  },
  {
    path: '/r/:room',
    component: Room,
    meta: {
      requiresAuth: true,
    },
    name: 'room',
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: 'auth' */ '@/views/Auth.vue'),
    name: 'login',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);

  if (requiresAuth && !auth.currentUser) {
    next('auth');
  } else {
    next();
  }
});

export default router;
