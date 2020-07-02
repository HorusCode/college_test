import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import '@/helpers/ui';

// Import styles
import './assets/scss/global.scss';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created() {
    if (store.getters.isUserAuth) {
      store.dispatch('getMe').then(() => {
        let path = localStorage.getItem('path');
        if (this.$router.currentRoute.path !== path) {
          this.$router.push(path);
        }
      });
    }
  },
  render(h) {
    return h(App);
  },
}).$mount('#app');
