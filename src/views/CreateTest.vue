<template>
  <div class="grid-main">
    <nav-aside />
    <main class="content">
      <header class="content__header">
        <h2 class="text-title">
          Тесты
        </h2>
      </header>
      <div class="content__body">
        <button
          class="btn btn-secondary size-1"
          @click="showModal = true"
        >
          <i class="mdi mdi-plus" />
          Создать
        </button>
        <table class="rwd-table">
          <tr>
            <th>Название теста</th>
            <th>Количество вопросов</th>
            <th>Создан</th>
            <th>Правлен</th>
            <th>Действия</th>
          </tr>
          <tr
            v-for="(test, index) in tests"
            :key="index"
          >
            <td>
              {{ test.title }}
            </td>
            <td>
              {{ test.questions.length }}
            </td>
            <td>
              {{ test.createdAt }}
            </td>
            <td>
              {{ test.updatedAt }}
            </td>
            <td>
              <button
                class="btn btn-primary is-small width-1 m-0"
                @click="updateModalTest(test)"
              >
                Редактировать
              </button>
              <button
                class="btn btn-danger is-small width-1 m-0"
                @click="updateModalTest(test)"
              >
                Удалить
              </button>
            </td>
          </tr>
        </table>
      </div>
    </main>
    <modal-create-test
      v-if="showModal"
      anim="slideDownLarge"
      :updating-test="updatingTest"
      @close="showModal = false"
    />
  </div>
</template>

<script>
import NavAside from '../components/NavAside';
import ModalCreateTest from '../components/ModalCreateTest';

export default {
  name: 'CreateTest',
  components: {
    ModalCreateTest,
    NavAside,
  },
  data() {
    return {
      showModal: false,
      tests: [],
      updatingTest: {},
    };
  },
  mounted() {
    this.$store.dispatch('loadTests').then((result) => {
      this.tests = result;
    });
  },
  methods: {
    updateModalTest(test) {
      this.updatingTest = JSON.parse(JSON.stringify(test));
      this.showModal = true;
    },
  },
};
</script>
