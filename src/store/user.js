import Api from "@/helpers/api";

export default {
  state: {
    user: {},
    status: "",
    token: localStorage.getItem("authtoken") || "",
  },
  mutations: {
    SET_USER: (state, payload) => {
      state.user.isAuth = true;
      state.user = payload.user;
      localStorage.setItem("role", payload.role);
      localStorage.setItem("group", state.user.group);
      localStorage.setItem("authtoken", payload.token);
    },
    REMOVE_USER: state => {
      state.user = {};
      state.status = "";
      localStorage.removeItem("role");
      localStorage.removeItem("name");
      localStorage.removeItem("authtoken");
    },
    AUTH_REQUEST: (state) => {
      state.status = 'loading'
    },
    AUTH_SUCCESS: (state, token, user) => {
      state.status = 'success';
      state.token = token;
      state.user = user;
    },
    AUTH_ERROR: (state) => {
      state.status = 'error'
    },
  actions: {
    async logIn({ commit }, payload) {
      commit("SET_PROCESSING", true);
      commit("REMOVE_ERROR", true);
      await Api.post("/login", {
        email: payload.email,
        password: payload.password,
      })
        .then(response => {
          commit("SET_USER", response.data);
        })
        .catch(error => {
          commit("SET_ERROR", error.response.data.errors);
        })
        .finally(() => {
          commit("SET_PROCESSING", false);
        });
    },
    stateChanged: ({ commit }, payload) => {
      if (payload) {
        commit("SET_USER", payload);
      } else {
        commit("REMOVE_USER");
      }
    },
    stateUserChanged({ commit }) {
      commit("SET_PROCESSING", true);
      Api.get("/user/me")
        .then(response => {
          commit("SET_USER", response.data);
        })
        .catch(error => {
          commit("SET_ERROR", error.response.data);
        })
        .finally(() => {
          commit("SET_PROCESSING", false);
        });
    },
  },
  getters: {
    isUserAuth: state => !!state.token,
    getAuthStatus: state => state.status,
    isUserUid: state => state.user.id,
  },
};
