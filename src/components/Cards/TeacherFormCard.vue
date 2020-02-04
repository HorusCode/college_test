<template>
  <div class="card teacherForm login--form">
    <div class="card-content">
      <header class="card-header">
        <h3 class="text-center mx-1">
          Вход для <span class="text-primary">преподавателя</span>
        </h3>
      </header>
      <form @submit.prevent="auth">
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
            v-model="password"
            class="effect"
            name="password"
            required
          >
          <span class="focus-border" />
          <label>Пароль</label>
        </div>
        <div class="d-flex justify-content-between">
          <span
            class="label-link"
            @click="$emit('showform', '.teacherForm','.studentForm')"
          >← Назад</span>
          <span
            class="label-link"
            @click="$emit('showform', '.teacherForm','.repairForm')"
          >Вспомнить пароль</span>
        </div>
        <div class="d-flex align-items-center justify-content-center mx-1">
          <button
            type="submit"
            class="btn btn-primary width-3"
          >
            Войти
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeacherFormCard',
  data() {
    return {
      login: '',
      password: '',
    };
  },
  methods: {
    auth() {
      const { login, password } = this;
      this.$store.dispatch('logInTeacher', { login, password });
    },
  },
};
</script>

<style scoped>

</style>
