import Api from "@/helpers/api";

export default {
  state: {
    tests: [],
  },
  mutations: {
    SET_TESTS: (state, payload) => {
      state.tests = payload;
    },
    UPDATE_TESTS: (state, payload) => {
      const idx = state.tests.findIndex(obj => obj.id === payload.id);
      Object.assign(state.tests[idx], payload);
    },
    ADD_TESTS: (state, payload) => {
      state.tests.unshift(payload);
    },
    DELETE_TEST: (state, payload) => {
      const idx = state.tests.findIndex(obj => obj.id === payload.id);
      state.tests.splice(idx, 1);
    },
    REMOVE_TESTS: state => {
      state.tests = [];
    },
  },
  actions: {
    loadTests({ commit }) {
      commit("SET_PROCESSING", true);
      Api.get("/tests")
        .then(response => {
          commit("SET_TESTS", response.data);
        })
        .finally(() => {
          commit("SET_PROCESSING", false);
        });
    },
    createTest({ commit }, payload) {
      commit("SET_PROCESSING", true);
      Api.post("/tests", payload)
        .then(response => {
          commit("ADD_TESTS", response.data.data);
        })
        .finally(() => {
          commit("SET_PROCESSING", false);
        });
    },
    updateTest({ commit }, payload) {
      commit("SET_PROCESSING", true);
      Api.put(`/tests/${payload.id}`, payload)
        .then(response => {
          commit("UPDATE_TESTS", response.data.data);
        })
        .finally(() => {
          commit("SET_PROCESSING", false);
        });
    },
    deleteTest({ commit }, payload) {
      commit("SET_PROCESSING", true);
      Api.delete(`/tests/${payload.id}`)
        .then(response => {
          commit("DELETE_TEST", response.data.id);
        })
        .finally(() => {
          commit("SET_PROCESSING", false);
        });
    },
    removeTests({ commit }) {
      commit("SET_PROCESSING", true);
      db.test.remove({}, { multi: true });
      commit("REMOVE_TESTS");
      commit("SET_PROCESSING", false);
    },
  },
  getters: {
    getTests: state => state.tests,
  },
};
