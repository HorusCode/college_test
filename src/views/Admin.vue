<template>
  <div class="grid-main">
    <nav-aside />
    <main class="content">
      <header class="content__header">
        <h2 class="text-title">
          Результаты студентов
        </h2>
      </header>
      <div class="content__body">
        <button
          class="btn btn-danger size-1"
          @click="removeResults"
        >
          <i class="mdi mdi-file-remove" />
          Очистить
        </button>
        <table class="rwd-table">
          <tr>
            <th>Имя</th>
            <th>Группа</th>
            <th>Тест</th>
            <th>Время</th>
          </tr>
          <tr
            v-for="(result, index) in results"
            :key="index"
          >
            <td>{{ result.student }}</td>
            <td>{{ result.group }}</td>
            <td>{{ result.test }}</td>
            <td>{{ result.time }}</td>
          </tr>
        </table>
      </div>
    </main>
  </div>
</template>

<script>
import NavAside from '../components/NavAside';

export default {
  name: 'Admin',
  components: {
    NavAside,
  },
  data() {
    return {
      results: [],
    };
  },
  mounted() {
    this.$store.dispatch('loadResults').then((result) => {
      this.results = result;
    });
  },
  methods: {
    removeResults() {
      this.$store.dispatch('removeResults');
    },
  },
};
</script>
