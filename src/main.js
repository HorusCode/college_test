import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";

// Import styles
import "./assets/scss/global.scss";

const appPath = require("app-root-path");

const { app } = require("electron").remote;

if (process.env.NODE_ENV === "production") {
  Vue.prototype.$path = app.getPath("exe").replace(/(\\|\/)[^\\\/]*$/, "");
} else {
  Vue.prototype.$path = appPath.path;
}
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created() {
    if (process.env.NODE_ENV === "production") {
      this.$router.push("/");
    }
    store.dispatch("stateUserChanged").then(() => {
      const userRole = localStorage.getItem("role");
      switch (userRole) {
        case "student":
          this.$router.push("/user");
          break;
        case "teacher":
          this.$router.push("/admin");
          break;
      }
    });
  },
  render(h) {
    return h(App);
  },
}).$mount("#app");

router.beforeEach((to, from, next) => {
  const { authorize } = to.meta;
  const userRole = localStorage.getItem("role");

  const publicPages = ["/"];
  const authRequired = !publicPages.includes(to.path);
  if (!store.getters.isUserAuth && authRequired) {
    return next("/");
  }

  if (authorize) {
    if (userRole === null && to.path !== "/") {
      return next("/");
    }
    if (authorize.length && !authorize.includes(userRole)) {
      switch (userRole) {
        case "student":
          return next("/user");
        case "teacher":
          return next("/admin");
      }
    }
  }
  next();
});
