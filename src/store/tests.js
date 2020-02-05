import db from '../config/db';

export default {
  state: {
    tests: [],
  },
  mutations: {
    SET_TESTS: (state, payload) => {
      state.tests = payload;
    },
    UPDATE_TESTS: (state, payload) => {
      const idx = state.tests.findIndex((obj) => obj.id === payload.id);
      Object.assign(state.tests[idx], payload);
    },
    ADD_TESTS: (state, payload) => {
      state.tests.push(payload);
    },
    DELETE_TEST: (state, payload) => {
      const idx = state.tests.findIndex((obj) => obj.id === payload.id);
      state.tests.splice(idx, 1);
    },
    REMOVE_TESTS: (state) => {
      state.tests = [];
    },
  },
  actions: {
    loadTests({ commit }) {
      commit('SET_PROCESSING', true);
      return db.test.find({}).then((result) => {
        commit('SET_TESTS', result);
        commit('SET_PROCESSING', false);
        return result;
      });
    },
    createTest({ commit }, payload) {
      commit('SET_PROCESSING', true);
      db.test.insert(payload).then((result) => {
        commit('ADD_TESTS', result);
        commit('SET_PROCESSING', false);
      });
    },
    updateTest({ commit }, payload) {
      commit('SET_PROCESSING', true);
      db.test.update({
        _id: payload.oldTest._id,
      }, payload.newTest, { returnUpdatedDocs: true }).then((result, res, lel) => {
        commit('SET_PROCESSING', false);
        commit('UPDATE_TESTS', result);
        console.log(result);
      });
    },
    deleteBook({ commit }, payload) {
      commit('setProcessing', true);
    },
    removeTests({ commit }) {
      commit('SET_PROCESSING', true);
      db.test.remove({}, { multi: true });
      commit('REMOVE_TESTS');
      commit('SET_PROCESSING', false);
    },
  },
  getters: {
    getTests: (state) => state.tests,
  },
};
