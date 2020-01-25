<template>
  <div class="login">
    <form id="login-student">
      <span class="form-title">Ученик</span>
      <div class="input-effect">
        <input type="text" class="effect" name="name" required />
        <label>ФИО</label>
        <span class="focus-border" />
      </div>
      <div class="input-effect">
        <input type="text" class="effect" name="group" required />
        <label>Группа</label>
        <span class="focus-border" />
      </div>
      <router-link to="/home">Войти</router-link>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    Auth: function() {
      const { email, password } = this;
      this.$store.dispatch("logIn", { email, password });
    }
  }
};
</script>

