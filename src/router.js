import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login';
import Admin from './views/Admin';
import User from './views/User';
import CreateTest from './views/CreateTest';
import { Role } from './helpers/role';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      meta: { authorize: [] },
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: { authorize: [Role.Admin] },
      children: [
        {
          path: 'test',
          component: CreateTest,
        },
      ],
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      meta: { authorize: [Role.User] },
    },
  ],
});
