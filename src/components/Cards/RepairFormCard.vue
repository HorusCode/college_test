<template>
  <div class="card repairForm">
    <div class="card-content">
      <header class="card-header">
        <h3 class="text-center mx-1">
          Введите <span class="text-primary">ключевое</span> слово
        </h3>
      </header>
      <form @submit.prevent="repairPassword">
        <div class="input-effect">
          <input
            v-model="login"
            class="effect"
            required
          >
          <span class="focus-border" />
          <label>Логин</label>
        </div>
        <div class="input-effect">
          <input
            v-model="wordKey"
            class="effect"
            required
          >
          <span class="focus-border" />
          <label>Ключевое слово</label>
        </div>
        <div class="d-flex justify-content-between">
          <span
            class="label-link"
            @click="$emit('showform', '.repairForm','.teacherForm')"
          >← Назад</span>
        </div>
        <div class="d-flex align-items-center justify-content-center mx-1">
          <button
            type="submit"
            class="btn btn-primary width-3"
          >
            Восстановить
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
const { dialog } = require('electron').remote;

export default {
  name: 'RepairFormCard',
  data() {
    return {
      login: '',
      wordKey: '',
    };
  },
  methods: {
    repairPassword() {
      const { login, wordKey } = this;
      this.$store.dispatch('repairTeacher', { login, wordKey }).then((result) => {
        const error = this.$store.getters.getError;
        console.log(result);
        if (error !== null) {
          dialog.showMessageBox({
            type: 'error',
            title: 'Ошибка',
            message: error.message,
          });
          return false;
        }
        dialog.showMessageBox({
          type: 'info',
          title: 'Пользователь найден',
          message: `Ваш пароль ${result.password}`,
        });
        return true;
      });
    },
  },
};
</script>

<style scoped>

</style>
