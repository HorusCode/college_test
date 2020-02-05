import Vue from 'vue';
import Vuex from 'vuex';
import userModule from './store/user';
import generalModule from './store/general';
import testsModule from './store/tests';

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';
export default new Vuex.Store({
  modules: {
    userModule,
    generalModule,
    testsModule,
  },
  strict: debug,
});
