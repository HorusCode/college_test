import db from '../config/db';

export default {
  state: {
    results: [],
  },
  mutations: {
    SET_RESULTS: (state, payload) => {
      state.results = payload;
    },
    ADD_RESULTS: (state, payload) => {
      state.results.push(payload);
    },
    DELETE_RESULTS: (state, payload) => {
      const idx = state.results.findIndex((obj) => obj.id === payload.id);
      state.results.splice(idx, 1);
    },
    REMOVE_RESULTS: (state) => {
      state.results = [];
    },
  },
  actions: {
    loadResults({ commit }, payload = {}) {
      commit('SET_PROCESSING', true);
      return db.result.find(payload).then((result) => {
        commit('SET_RESULTS', result);
        commit('SET_PROCESSING', false);
        return result;
      });
    },
    createResult({ commit }, payload) {
      commit('SET_PROCESSING', true);
      db.result.insert(payload).then((result) => {
        commit('ADD_RESULTS', result);
        commit('SET_PROCESSING', false);
      });
    },
    removeResults({ commit }) {
      commit('SET_PROCESSING', true);
      db.result.remove({}, { multi: true });
      commit('REMOVE_RESULTS');
      commit('SET_PROCESSING', false);
    },
  },
  getters: {
    getResults: (state) => state.results,
  },
};
