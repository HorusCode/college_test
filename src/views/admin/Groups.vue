<template>
  <div class="grid-main">
    <NavAside />
    <main class="content">
      <header class="content__header">
        <h2 class="text-title">
          Группы
        </h2>
      </header>
      <div class="content__body">
        <button class="btn btn-primary-outline" @click="getData">
          <i class="mdi mdi-gentoo" />
          Призвать
        </button>
        <div class="table-wrapper">
          <table class="table group">
            <tbody>
              <template v-for="(item, i) in data">
                <tr
                  :key="'view' + i"
                  class="view"
                  :class="{ open: item.selected }"
                  @click="$set(item, 'selected', !item.selected)"
                >
                  <td>{{ item.group }}</td>
                </tr>
                <tr :key="'fold' + i" class="fold" :class="{ open: item.selected }">
                  <td colspan="3">
                    <table class="table">
                      <thead>
                        <tr>
                          <th>
                            <span>ФИО</span>
                          </th>
                          <th>
                            <span>Зарегистрирован</span>
                          </th>
                          <th>
                            <span>Cust. name</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <template v-for="(student, j) in item.students">
                          <tr :key="'student' + j">
                            <td>{{ getFullName(student) }}</td>
                            <td>{{ student.created_at }}</td>
                            <td></td>
                          </tr>
                        </template>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import NavAside from '../../components/NavAside';

export default {
  name: 'Groups',
  components: {
    NavAside,
  },
  data() {
    return {};
  },
  computed: {
    data() {
      return this.$store.getters.getGroupedStudent;
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$store.dispatch('loadGroupedStudents');
    },
    getFullName(arr) {
      return `${arr.lastname} ${arr.firstname} ${arr.patronymic}`;
    },
  },
};
</script>

<style scoped></style>
