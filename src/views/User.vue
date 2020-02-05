<template>
  <div class="grid-main">
    <nav-aside />
    <main class="content">
      <header class="content__header">
        <h2 class="text-title">
          Выполнение тестов
        </h2>
      </header>
      <div class="content__body">
        <div class="select">
          <input
            type="checkbox"
            class="options-view-button"
          >
          <div class="select__button">
            <div class="selected__value">
              <span>{{ selectedTestTitle }}</span>
            </div>
            <div class="chevrons">
              <i class="mdi mdi-chevron-up" />
              <i class="mdi mdi-chevron-down" />
            </div>
          </div>
          <div class="options">
            <div
              v-for="(test, index) in tests"
              :key="index"
              class="option"
            >
              <input
                class="option__radio"
                type="radio"
                @click="select(test)"
              >
              <span class="label">{{ test.title }}</span>
            </div>
          </div>
        </div>


        <button
          id="loadTest"
          class="btn btn-primary"
        >
          Начать
        </button>
      </div>
    </main>
  </div>
</template>

<script>
import NavAside from '../components/NavAside';

export default {
  name: 'User',
  components: {
    NavAside,
  },
  data() {
    return {
      selectedTestTitle: 'Выберите тест',
      selectedTest: {},
      tests: [],
    };
  },
  mounted() {
    console.log(this.$store.getters.getTests);
    this.tests = this.$store.getters.getTests;
  },
  methods: {
    select(test) {
      this.selectedTestTitle = test.title;
      document.querySelector('.options-view-button').checked = false;
    },
  },
};
</script>
