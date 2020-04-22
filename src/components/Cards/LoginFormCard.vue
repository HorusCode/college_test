<template>
  <div class="card loginForm login--form">
    <div class="card-content">
      <header class="card-header">
        <h3 class="text-center mx-1">
          <span class="text-primary">Вход</span>
          в систему
        </h3>
      </header>
      <form @submit.prevent="auth">
        <div class="input-line">
          <label for="login" class="input-label">Email</label>
          <div class="input-group">
            <span class="mdi mdi-email pos-left" />
            <input id="login" v-model="email" type="text" class="input" name="email" />
          </div>
          <span v-if="'email' in errors" class="invalid-feedback">{{ errors.email[0] }}</span>
        </div>
        <div class="input-line">
          <label for="password" class="input-label">Пароль</label>
          <div class="input-group">
            <span class="mdi mdi-textbox-password pos-left" />
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              class="input"
              name="password"
            />
            <span
              class="mdi  pos-right eye-password"
              :class="[{ 'mdi-eye-outline': showPassword }, 'mdi-eye-off-outline']"
              @click="showPassword = !showPassword"
            />
          </div>
          <span v-if="'password' in errors" class="invalid-feedback">{{ errors.password[0] }}</span>
        </div>
        <div class="d-flex justify-content-between">
          <span class="label-link" @click="$emit('showform', '.loginForm', '.codeForm')">
            Использовать код
          </span>
          <span class="label-link" @click="$emit('showform', '.loginForm', '.emailForm')">
            Вспомнить пароль
          </span>
        </div>
        <div class="d-flex align-items-center justify-content-center mx-1">
          <button type="submit" class="btn btn-primary width-1">
            <div v-if="status" class="spinner spinner-3 s-24"></div>
            <span v-else>Вход</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'LoginFormCard',
  data() {
    return {
      showPassword: false,
      email: '',
      password: '',
    };
  },
  computed: {
    ...mapState({
      status: state => state.userModule.status === 'loading',
      role: state => state.userModule.role,
      errors: state => state.generalModule.error,
    }),
  },
  methods: {
    auth() {
      const { email, password } = this;
      this.$store.dispatch('logIn', { email, password }).then(() => {
        switch (this.role) {
          case 'student':
            this.$router.push('/user');
            break;
          case 'teacher':
            this.$router.push('/admin');
            break;
        }
      });
    },
  },
};
</script>

<style scoped></style>
