<template>
  <div class="card registerForm login--form">
    <div class="card-content">
      <header class="card-header">
        <h3 class="text-center mx-1">
          Регистрация <span class="text-primary">преподавателя</span>
        </h3>
      </header>
      <form @submit.prevent="register">
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
            v-model="name"
            class="effect"
            required
          >
          <span class="focus-border" />
          <label>ФИО</label>
        </div>
        <div class="input-effect">
          <input
            v-model="password"
            class="effect"
            required
            type="password"
          >
          <span class="focus-border" />
          <label>Пароль</label>
        </div>
        <div class="input-effect">
          <input
            v-model="confirmPassword"
            class="effect"
            required
            type="password"
          >
          <span class="focus-border" />
          <label>Повторите пароль</label>
        </div>
        <div class="input-effect">
          <input
            v-model="wordKey"
            class="effect"
            required
          >
          <span class="focus-border" />
          <label>Придумайте ключевое слово</label>
        </div>
        <div class="d-flex justify-content-center">
          <span
            class="label-link"
            @click="$emit('showform', '.registerForm','.teacherForm')"
          >Вход</span>
        </div>
        <div class="d-flex align-items-center justify-content-center mx-1">
          <button
            type="submit"
            class="btn btn-primary width-3"
          >
            Регистрация
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  const { dialog } = require('electron').remote;

export default {
  name: 'RegisterFormCard',
  data() {
    return {
      login: '',
      password: '',
      confirmPassword: '',
      wordKey: '',
      name: '',
    };
  },
  methods: {
    register() {
      const {
        login, password, wordKey, name,
      } = this;
      this.$store.dispatch('registerTeacher', {
        login, password, wordKey, name,
      }).then(() => {
        const error = this.$store.getters.getError;
        if (error !== null) {
          dialog.showMessageBox({
            type: 'error',
            title: 'Ошибка',
            message: error.message,
          });
          return false;
        }
        return true;
      });
    },
  },
};
</script>

<style scoped>

</style>
