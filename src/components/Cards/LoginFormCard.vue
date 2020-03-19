<template>
  <div class="card loginForm login--form">
    <div class="card-content">
      <header class="card-header">
        <h3 class="text-center mx-1">
          <span class="text-primary">Вход</span> в систему
        </h3>
      </header>
      <form @submit.prevent="auth">
        <div class="input-effect">
          <input
            v-model="email"
            type="text"
            class="effect"
            required
          >
          <span class="focus-border" />
          <label>Email</label>
        </div>
        <div class="input-effect">
          <input
            v-model="password"
            class="effect"
            name="name"
            type="password"
            required
          >
          <span class="focus-border" />
          <label>Пароль</label>
        </div>
        <div class="d-flex justify-content-center">
          <span
            class="label-link"
            @click="$emit('showform', '.loginForm','.repairForm')"
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
import { Role } from '@/helpers/role';

export default {
  name: 'LoginFormCard',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    auth() {
      const { email, password } = this;
      this.$store.dispatch('logIn', { email, password, role: Role.User });
      this.$router.push('/user');
    },
  },
};
</script>

<style scoped>

</style>
