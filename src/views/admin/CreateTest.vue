<template>
  <div class="grid-main">
    <NavAside />
    <main class="content">
      <header class="content__header">
        <h2 class="text-title">
          Тесты
        </h2>
      </header>
      <div class="content__body">
        <button class="btn btn-secondary size-1" @click="(showModal = true), (updatingTest = {})">
          <i class="mdi mdi-plus" />
          Создать
        </button>
        <button class="btn btn-danger size-1" @click="loadTests">
          <i class="mdi mdi-file-remove" />
          Очистить
        </button>
        <div class="table-wrapper">
          <table class="table">
            <thead>
              <tr>
                <th>Название теста</th>
                <th>Количество вопросов</th>
                <th>Создан</th>
                <th>Правлен</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(test, index) in tests" :key="index">
                <td>
                  {{ test.title }}
                </td>
                <td>
                  {{ test.questions.length }}
                </td>
                <td>
                  {{
                    moment
                      .utc(test.created_at)
                      .local()
                      .format("HH:mm DD.MM.YY")
                  }}
                </td>
                <td>
                  {{
                    moment
                      .utc(test.updated_at)
                      .local()
                      .format("HH:mm DD.MM.YY")
                  }}
                </td>
                <td>
                  <button
                    class="btn btn-primary is-small width-1 m-0"
                    @click="updateModalTest(test)"
                  >
                    Редактировать
                  </button>
                  <button class="btn btn-danger is-small width-1 m-0" @click="deleteTest(test.id)">
                    Удалить
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
    <ModalCreateTest
      v-if="showModal"
      anim="slideDownLarge"
      :updating-test="updatingTest"
      @close="showModal = false"
    />
  </div>
</template>

<script>
import NavAside from "../../components/NavAside";
import ModalCreateTest from "../../components/ModalCreateTest";
import moment from "moment";
export default {
  name: "CreateTest",
  components: {
    ModalCreateTest,
    NavAside,
  },
  data() {
    return {
      showModal: false,
      updatingTest: {},
      moment: moment,
    };
  },
  computed: {
    tests() {
      return this.$store.getters.getTests;
    },
  },
  mounted() {
    this.loadTests();
  },
  methods: {
    updateModalTest(test) {
      this.updatingTest = JSON.parse(JSON.stringify(test));
      this.showModal = true;
    },
    removeTests() {
      this.$store.dispatch("removeTests");
    },
    deleteTest(id) {
      this.$store.dispatch("deleteTest", { id: id });
    },
    loadTests() {
      this.$store.dispatch("loadTests");
    },
  },
};
</script>
