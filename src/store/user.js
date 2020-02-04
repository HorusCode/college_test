import db from '../config/db';


export default {
  state: {
    user: {
      isAuth: false,
      _id: null,
    },
  },
  mutations: {
    SET_USER: (state, payload) => {
      state.user.isAuth = true;
      state.user._id = payload._id;
      localStorage.setItem('role', payload.role);
      localStorage.setItem('name', payload.name);
    },
    REMOVE_USER: (state) => {
      state.user = {
        isAuth: false,
        _id: null,
      };
    },
  },
  actions: {
    logInStudent({ commit }, payload) {
      commit('SET_PROCESSING', true);
      commit('REMOVE_ERROR', true);
      commit('SET_USER', payload);
    },
    logInTeacher({ commit }, payload) {
      commit('SET_PROCESSING', true);
      commit('REMOVE_ERROR', true);
      db.teacher.findOne({
        login: payload.login,
        password: payload.password,
      }).then((data) => {
        console.log(data._id);
        commit('SET_USER', data);
      });
    },
    registerTeacher({ commit }, payload) {
      commit('SET_PROCESSING', true);
      commit('REMOVE_ERROR', true);
      db.teacher.insert({
        login: payload.login,
        password: payload.password,
        wordKey: payload.wordKey,
      });
    },
    stateChanged: ({ commit }, payload) => {
      if (payload) {
        commit('SET_USER', payload);
      } else {
        commit('REMOVE_USER');
      }
    },
    signOut: () => {

    },
  },
  getters: {
    isUserAuth: (state) => state.user.isAuth,
    isUserUid: (state) => state.user.id,
  },
};
