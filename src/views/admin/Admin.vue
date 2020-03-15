<template>
  <div class="grid-main">
    <NavAside />
    <main class="content">
      <header class="content__header">
        <h2 class="text-title">
          Результаты студентов
        </h2>
      </header>
      <div class="content__body">
        <button class="btn btn-danger size-1" @click="loadResults">
          <i class="mdi mdi-file-remove" />
          Очистить
        </button>
        <div class="table-wrapper">
          <table class="table">
            <thead>
              <tr>
                <th>Имя</th>
                <th>Группа</th>
                <th>Тест</th>
                <th>Оценка</th>
                <th>Время</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(result, index) in results" :key="index">
                <td>{{ getFullName(result.user) }}</td>
                <td>{{ result.user.group }}</td>
                <td>{{ result.title }}</td>
                <td>{{ result.rate }}</td>
                <td>{{ result.date }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import NavAside from "../../components/NavAside";

export default {
  name: "Admin",
  components: {
    NavAside,
  },
  data() {
    return {};
  },
  computed: {
    results() {
      return this.$store.getters.getResults;
    },
  },
  mounted() {
    this.loadResults();
  },
  methods: {
    removeResults() {
      this.$store.dispatch("removeResults");
    },
    loadResults() {
      this.$store.dispatch("loadResults");
    },
    getFullName(arr) {
      return `${arr.lastname} ${arr.firstname} ${arr.patronymic}`;
    },
  },
};
</script>
