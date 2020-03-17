import Api from "@/helpers/api";

export default {
  state: {
    user: {
      isAuth: false,
      id: null,
      role: null,
      group: null,
      firstname: null,
      lastname: null,
      patronymic: null,
    },
  },
  mutations: {
    SET_USER: (state, payload) => {
      state.user.isAuth = true;
      state.user.id = payload.user.id;
      state.user.group = payload.group ? payload.group : "";
      state.user.firstname = payload.user.firstname;
      state.user.patronymic = payload.user.patronymic;
      state.user.lastname = payload.user.lastname;
      state.user.role = payload.role;
      localStorage.setItem("role", payload.role);
      localStorage.setItem("group", state.user.group);
      localStorage.setItem("authtoken", payload.token);
    },
    REMOVE_USER: state => {
      state.user = {
        isAuth: false,
        id: null,
        role: null,
        group: null,
        firstname: null,
        lastname: null,
        patronymic: null,
      };
      localStorage.removeItem("role");
      localStorage.removeItem("name");
      localStorage.removeItem("authtoken");
    },
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
    async stateUserChanged({ commit }) {
      commit("SET_PROCESSING", true);
      await Api.get("/user/me")
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
    isUserAuth: state => state.user.isAuth,
    isUserUid: state => state.user.id,
    currentUser: state => {
      if (state.user.isAuth) {
        return state.user;
      }
      return null;
    },
  },
};
