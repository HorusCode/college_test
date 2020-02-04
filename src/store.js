import Vue from 'vue';
import Vuex from 'vuex';
import userModule from './store/user';
import generalModule from './store/general';

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';
export default new Vuex.Store({
  modules: {
    userModule,
    generalModule,
  },
  strict: debug,
});
