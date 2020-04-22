<template>
  <div class="grid-main">
    <NavAside />
    <main class="content">
      <header class="content__header">
        <h2 class="text-title">
          Мои резульаты
        </h2>
      </header>
      <div class="content__body">
        <table class="rwd-table">
          <tr>
            <th>Имя</th>
            <th>Группа</th>
            <th>Тест</th>
            <th>Оценка</th>
            <th>Время</th>
            <th>Когда решал</th>
          </tr>
          <tr v-for="(result, index) in results" :key="index">
            <td>{{ result.student }}</td>
            <td>{{ result.group }}</td>
            <td>{{ result.test }}</td>
            <td>{{ result.result }}</td>
            <td>{{ result.time }}</td>
            <td>{{ result.date }}</td>
          </tr>
        </table>
      </div>
    </main>
  </div>
</template>

<script>
import NavAside from '@/components/NavAside';

export default {
  name: 'Result',
  components: {
    NavAside,
  },
  data() {
    return {
      results: [],
    };
  },
  mounted() {
    this.$store.dispatch('loadResults', { student: localStorage.getItem('name') }).then(result => {
      this.results = result;
    });
  },
};
</script>

<style scoped></style>
