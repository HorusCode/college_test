import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';


// Import styles
import './assets/scss/global.scss';

const appPath = require('app-root-path');

const { app } = require('electron').remote;

if (process.env.NODE_ENV === 'production') {
  Vue.prototype.$path = app.getPath('exe').replace(/(\\|\/)[^\\\/]*$/, '');
} else {
  Vue.prototype.$path = appPath.path;
}
Vue.config.productionTip = false;


new Vue({
  router,
  store,
  created() {
    if (process.env.NODE_ENV === 'production') {
      this.$router.push('/');
    }
  },
  render(h) {
    return h(App);
  },
}).$mount('#app');


router.beforeEach((to, from, next) => {
  const { authorize } = to.meta;
  const userRole = localStorage.getItem('role');
  if (authorize) {
    if (userRole === null && to.path !== '/') {
      return next('/');
    }
    if (authorize.length && !authorize.includes(userRole)) {
      switch (userRole) {
        case 'Student':
          return next('/user');
        case 'Teacher':
          return next('/admin');
      }
    }
  }
  next();
});
