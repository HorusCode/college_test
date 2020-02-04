<template>
  <div class="card studentForm login--form">
    <div class="card-content">
      <header class="card-header">
        <h3 class="text-center mx-1">
          <span class="text-primary">Вход</span> в систему
        </h3>
      </header>
      <form @submit.prevent="auth">
        <div class="input-effect">
          <input
            v-model="group"
            type="text"
            class="effect"
            required
          >
          <span class="focus-border" />
          <label>Группа</label>
        </div>
        <div class="input-effect">
          <input
            v-model="name"
            class="effect"
            name="name"
            required
          >
          <span class="focus-border" />
          <label>ФИО</label>
        </div>
        <div class="d-flex justify-content-center">
          <span
            class="label-link"
            @click="$emit('showform', '.studentForm','.teacherForm')"
          >Войти как преподаватель</span>
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
  name: 'StudentFormCard',
  data() {
    return {
      group: '',
      name: '',
    };
  },
  methods: {
    auth() {
      const { group, name } = this;
      this.$store.dispatch('logInStudent', { group, name });
    },
  },
};
</script>

<style scoped>

</style>
