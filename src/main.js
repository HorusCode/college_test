import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";

// Import styles
import "./assets/scss/global.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created() {
    store.dispatch("getMe");
  },
  render(h) {
    return h(App);
  },
}).$mount("#app");
