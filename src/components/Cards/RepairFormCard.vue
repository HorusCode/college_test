<template>
  <div class="card repairForm login--form">
    <div class="card-content">
      <header class="card-header">
        <h3 class="text-center mx-1">
          Введите <span class="text-primary">ключевое</span> слово
        </h3>
      </header>
      <form>
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
            Востановить
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RepairFormCard',
  data() {
    return {
      login: '',
      wordKey: '',
    };
  },
};
</script>

<style scoped>

</style>
