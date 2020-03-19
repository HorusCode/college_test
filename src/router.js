import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login";
import Admin from "./views/admin/Admin";
import User from "./views/user/User";
import Result from "./views/user/Result";
import CreateTest from "./views/admin/CreateTest";
import AdminLecture from "./views/admin/Lectures";
import AdminPresentation from "./views/admin/Presentation";
import AdminPractice from "./views/admin/Practices";
import AdminGroups from "./views/admin/Groups";
import UserLecture from "./views/user/Lectures";
import UserPractice from "./views/user/Practices";
import UserPresentation from "./views/user/Presentation";
import { Role } from "./helpers/role";

import store from "@/store";

Vue.use(Router);

let entryUrl = null;

const guard = async (to, from, next) => {
  if (store.getters.isUserAuth) {
    if (entryUrl) {
      const url = entryUrl;
      entryUrl = null;
      return next(url);
    } else {
      return next();
    }
  }
  console.log(store.getters.isUserAuth);
  await store.dispatch("stateUserChanged");
  console.log(store.getters.isUserAuth);
  /*if (store.getters.isUserAuth) {
    const userRole = localStorage.getItem("role");
    switch (userRole) {
      case "student":
        next("/user");
        break;
      case "teacher":
        next("/admin");
        break;
      default:
        next("/");
        break;
    }
  } else {
    entryUrl = to.path;
    next("/");
  }*/
};

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
      beforeEnter: guard,
      meta: { authorize: [] },
    },
    {
      path: "/admin",
      name: "admin",
      component: Admin,
      beforeEnter: guard,
      meta: { authorize: [Role.Admin] },
    },
    {
      path: "/admin/test",
      component: CreateTest,
      name: "create-test",
      beforeEnter: guard,
      meta: { authorize: [Role.Admin] },
    },
    {
      path: "/user",
      name: "user",
      component: User,
      beforeEnter: guard,
      meta: { authorize: [Role.User] },
    },
    {
      path: "/user/presentation",
      name: "user-presentation",
      component: UserPresentation,
      beforeEnter: guard,
      meta: { authorize: [Role.User] },
    },
    {
      path: "/user/practices",
      name: "user-practice",
      component: UserPractice,
      beforeEnter: guard,
      meta: { authorize: [Role.User] },
    },
    {
      path: "/user/results",
      name: "results",
      component: Result,
      beforeEnter: guard,
      meta: { authorize: [Role.User] },
    },
    {
      path: "/user/lectures",
      name: "user-lectures",
      component: UserLecture,
      beforeEnter: guard,
      meta: { authorize: [Role.User] },
    },
    {
      path: "/admin/practices",
      name: "admin-practices",
      component: AdminPractice,
      beforeEnter: guard,
      meta: { authorize: [Role.Admin] },
    },
    {
      path: "/admin/lectures",
      name: "admin-lectures",
      component: AdminLecture,
      beforeEnter: guard,
      meta: { authorize: [Role.Admin] },
    },
    {
      path: "/admin/presentation",
      name: "admin-presentation",
      component: AdminPresentation,
      beforeEnter: guard,
      meta: { authorize: [Role.Admin] },
    },
    {
      path: "/admin/groups",
      name: "admin-groups",
      component: AdminGroups,
      beforeEnter: guard,
      meta: { authorize: [Role.Admin] },
    },
  ],
});
