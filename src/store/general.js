export default {
  state: {
    processing: false,
    error: {},
  },
  mutations: {
    SET_PROCESSING: (state, payload) => {
      state.processing = payload;
    },
    SET_ERROR: (state, payload) => {
      state.error = payload;
    },
    REMOVE_ERROR: state => {
      state.error = null;
    },
  },
  getters: {
    getProcessing: state => state.processing,
    getError: state => state.error,
  },
};
