import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import firebaseConfig from "./config/firebase";
import * as firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";

// Import styles
import "./assets/scss/global.scss";

Vue.config.productionTip = false;

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const storage = firebaseApp.storage();
Vue.$db = db;
Vue.$storage = storage;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
