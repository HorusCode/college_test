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
          <input type="checkbox" class="options-view-button">
          <div class="select__button">
            <div class="selected__value">
              <span>{{ selectedTest }}</span>
            </div>
            <div class="chevrons">
              <i class="mdi mdi-chevron-up" />
              <i class="mdi mdi-chevron-down" />
            </div>
          </div>
          <div class="options">
            <div class="option">
              <input class="option__radio" type="radio" value="kek" @click="select">
              <span class="label">kek</span>
            </div>
            <div class="option">
              <input class="option__radio" type="radio" value="qwe" @click="select">
              <span class="label">qwe</span>
            </div>
            <div class="option">
              <input class="option__radio" type="radio" value="asd" @click="select">
              <span class="label">asd</span>
            </div>
            <div class="option">
              <input class="option__radio" type="radio" value="zxc" @click="select">
              <span class="label">zxc</span>
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
      selectedTest: 'Выберите тест',
    };
  },
  methods: {
    select(event) {
      this.selectedTest = event.target.value;
      document.querySelector('.options-view-button').checked = false;
    },
  },
};
</script>
