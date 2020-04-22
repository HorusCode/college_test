import Api from '@/helpers/api';

export default {
  state: {
    user: {},
    status: '',
    token: localStorage.getItem('authtoken') || '',
    role: '',
  },
  mutations: {
    SET_USER: (state, payload) => {
      state.user = payload.user;
      state.role = payload.role;
      if (payload.token) {
        state.token = payload.token;
        localStorage.setItem('authtoken', payload.token);
      }
    },
    REMOVE_USER: state => {
      state.user = {};
      state.status = '';
      state.role = '';
      state.token = '';
      localStorage.removeItem('authtoken');
    },
    AUTH_STATUS: (state, status = '') => {
      state.status = status;
    },
  },
  actions: {
    logIn({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit('AUTH_STATUS', 'loading');
        Api.post('/login', {
          email: payload.email,
          password: payload.password,
        })
          .then(response => {
            commit('SET_USER', response.data);
            commit('AUTH_STATUS', 'success');
            resolve(response);
          })
          .catch(error => {
            commit('generalModule/SET_ERROR', error.response.data.errors);
            commit('AUTH_STATUS', 'error');
            reject(error);
          });
      });
    },
    logOut({ commit }) {
      return new Promise((resolve, reject) => {
        commit('AUTH_STATUS', 'loading');
        Api.get('/logout')
          .then(response => {
            commit('REMOVE_USER', response.data);
            commit('AUTH_STATUS', 'success');
            localStorage.removeItem('path');
            resolve(response);
          })
          .catch(error => {
            commit('AUTH_STATUS', 'error');
            reject(error);
          });
      });
    },
    getMe({ commit }) {
      commit('SET_PROCESSING', true);
      return new Promise((resolve, reject) => {
        Api.get('/user/me')
          .then(response => {
            commit('SET_USER', response.data);
            resolve(response);
          })
          .catch(error => {
            commit('SET_ERROR', error.response.data);
            reject(error.response);
          })
          .finally(() => {
            commit('SET_PROCESSING', false);
          });
      });
    },
  },
  getters: {
    isUserAuth: state => !!state.token,
    userRole: state => state.role,
  },
};
