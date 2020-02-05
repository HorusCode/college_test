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
        <button class="btn btn-secondary size-1" @click="showModal = true">
          <i class="mdi mdi-plus" />
          Создать
        </button>
        <table class="rwd-table">
          <tr>
            <th>Movie Title</th>
            <th>Genre</th>
            <th>Year</th>
            <th>Gross</th>
          </tr>
          <tr>
            <td data-th="Movie Title">
              Star Wars
            </td>
            <td data-th="Genre">
              Adventure, Sci-fi
            </td>
            <td data-th="Year">
              1977
            </td>
            <td data-th="Gross">
              $460,935,665
            </td>
          </tr>
          <tr>
            <td data-th="Movie Title">
              Howard The Duck
            </td>
            <td data-th="Genre">
              "Comedy"
            </td>
            <td data-th="Year">
              1986
            </td>
            <td data-th="Gross">
              $16,295,774
            </td>
          </tr>
          <tr>
            <td data-th="Movie Title">
              American Graffiti
            </td>
            <td data-th="Genre">
              Comedy, Drama
            </td>
            <td data-th="Year">
              1973
            </td>
            <td data-th="Gross">
              $115,000,000
            </td>
          </tr>
        </table>
      </div>
    </main>
    <modal-create-test v-if="showModal" anim="slideDownLarge" @close="showModal = false"></modal-create-test>
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
    };
  },
  methods: {

  },
};
</script>
