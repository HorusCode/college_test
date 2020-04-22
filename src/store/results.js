import Api from '@/helpers/api';

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
      const idx = state.results.findIndex(obj => obj.id === payload.id);
      state.results.splice(idx, 1);
    },
    REMOVE_RESULTS: state => {
      state.results = [];
    },
  },
  actions: {
    loadResults({ commit }) {
      commit('SET_PROCESSING', true);
      Api.get('/ratings')
        .then(response => {
          commit('SET_RESULTS', response.data.data);
        })
        .finally(() => {
          commit('SET_PROCESSING', false);
        });
    },
  },
  getters: {
    getResults: state => state.results,
  },
};
