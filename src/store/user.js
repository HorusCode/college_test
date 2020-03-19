import db from '../config/db';


export default {
  state: {
    user: {
      isAuth: false,
      _id: null,
      role: null,
      group: null,
      name: null,
    },
  },
  mutations: {
    SET_USER: (state, payload) => {
      state.user.isAuth = true;
      state.user._id = payload._id;
      state.user.role = payload.role;
      state.user.group = payload.group;
      state.user.name = payload.name;
      localStorage.setItem('role', payload.role);
      localStorage.setItem('name', payload.name);
      localStorage.setItem('group', payload.group);
    },
    REMOVE_USER: (state) => {
      state.user = {
        isAuth: false,
        _id: null,
        role: null,
        group: null,
        name: null,
      };
      localStorage.removeItem('role');
      localStorage.removeItem('name');
      localStorage.removeItem('group');
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
      return db.teacher.findOne({
        login: payload.login,
        password: payload.password,
      }).then((data) => {
        if (data === null) {
          commit('SET_ERROR', { message: 'Пользователь не найден!' });
          return false;
        }
        commit('SET_USER', data);
        commit('REMOVE_ERROR');
        return true;
      });
    },
    registerTeacher({ commit }, payload) {
      commit('SET_PROCESSING', true);
      return db.teacher.find({ login: payload.login }).then((result) => {
        if (result.length === 0) {
          db.teacher.insert({
            login: payload.login,
            password: payload.password,
            wordKey: payload.wordKey,
            name: payload.name,
            role: 'Teacher',
          });
          commit('REMOVE_ERROR');
          commit('SET_PROCESSING', false);
          return true;
        }
        commit('SET_ERROR', { message: 'Пользователь существует! Измените логин.' });
        commit('SET_PROCESSING', false);
        return false;
      });
    },
    repairTeacher({ commit }, payload) {
      commit('SET_PROCESSING', true);
      return db.teacher.findOne({ login: payload.login, wordKey: payload.wordKey })
        .then((result) => {
          if (result.length === 0) {
            commit('SET_PROCESSING', false);
            commit('SET_ERROR', { message: 'Такого пользователя нет.' });
            return false;
          }
          commit('REMOVE_ERROR');
          commit('SET_PROCESSING', false);
          return result;
        });
    },
    stateChanged: ({ commit }, payload) => {
      if (payload) {
        commit('SET_USER', payload);
      } else {
        commit('REMOVE_USER');
      }
    },
  },
  getters: {
    isUserAuth: (state) => state.user.isAuth,
    isUserUid: (state) => state.user.id,
    currentUser: (state) => {
      if (state.user.isAuth) {
        return state.user;
      }
      return null;
    },
  },
};
