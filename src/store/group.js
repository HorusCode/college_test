import Api from "@/helpers/api";

export default {
  state: {
    students: [],
  },
  mutations: {
    SET_STUDENT: (state, payload) => {
      state.students = payload;
    },
  },
  actions: {
    loadGroupedStudents({ commit }) {
      commit("SET_PROCESSING", true);
      Api.get("/groups/student")
        .then(response => {
          commit("SET_STUDENT", response.data.data);
        })
        .finally(() => {
          commit("SET_PROCESSING", false);
        });
    },
  },
  getters: {
    getGroupedStudent: state => state.students,
  },
};
