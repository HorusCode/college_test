import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login';
import Admin from './views/admin/Admin';
import User from './views/user/User';
import Result from './views/user/Result';
import CreateTest from './views/admin/CreateTest';
import AdminLecture from './views/admin/Lectures';
import AdminPresentation from './views/admin/Presentation';
import AdminPractice from './views/admin/Practices';
import AdminGroups from './views/admin/Groups';
import UserLecture from './views/user/Lectures';
import UserPractice from './views/user/Practices';
import UserPresentation from './views/user/Presentation';
import { Role } from './helpers/role';

import store from '@/store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      meta: { authorize: [], requiresAuth: false },
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: { authorize: [Role.Admin], requiresAuth: true },
    },
    {
      path: '/admin/test',
      component: CreateTest,
      name: 'create-test',
      meta: { authorize: [Role.Admin], requiresAuth: true },
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      meta: { authorize: [Role.User], requiresAuth: true },
    },
    {
      path: '/user/presentation',
      name: 'user-presentation',
      component: UserPresentation,
      meta: { authorize: [Role.User], requiresAuth: true },
    },
    {
      path: '/user/practices',
      name: 'user-practice',
      component: UserPractice,
      meta: { authorize: [Role.User], requiresAuth: true },
    },
    {
      path: '/user/results',
      name: 'results',
      component: Result,
      meta: { authorize: [Role.User], requiresAuth: true },
    },
    {
      path: '/user/lectures',
      name: 'user-lectures',
      component: UserLecture,
      meta: { authorize: [Role.User], requiresAuth: true },
    },
    {
      path: '/admin/practices',
      name: 'admin-practices',
      component: AdminPractice,
      meta: { authorize: [Role.Admin], requiresAuth: true },
    },
    {
      path: '/admin/lectures',
      name: 'admin-lectures',
      component: AdminLecture,
      meta: { authorize: [Role.Admin], requiresAuth: true },
    },
    {
      path: '/admin/presentation',
      name: 'admin-presentation',
      component: AdminPresentation,
      meta: { authorize: [Role.Admin], requiresAuth: true },
    },
    {
      path: '/admin/groups',
      name: 'admin-groups',
      component: AdminGroups,
      meta: { authorize: [Role.Admin], requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const { authorize, requiresAuth } = to.meta;
  const userRole = store.getters.userRole;
  if (requiresAuth || (userRole !== '' && to.path !== '/')) {
    if (store.getters.isUserAuth && authorize.length) {
      localStorage.setItem('path', to.path);
      next();
      return;
    }
    next('/');
  } else {
    next();
  }
});

export default router;
