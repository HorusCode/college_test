<template>
  <div class="card emailForm login--form">
    <div class="card-content">
      <header class="card-header">
        <h3 class="text-center mx-1">
          Write your
          <span class="text-primary">email</span>
          for pass
        </h3>
      </header>
      <form>
        <div class="input-line">
          <label for="email" class="input-label">Email</label>
          <div class="input-group">
            <span class="mdi mdi-email-outline pos-left" />
            <input id="email" v-model="email" type="text" class="input" />
          </div>
        </div>
        <div class="d-flex justify-content-between">
          <span class="label-link" @click="$emit('showform', '.emailForm', '.loginForm')">
            ← Back
          </span>
        </div>
        <div class="d-flex align-items-center justify-content-center mx-1">
          <button type="submit" class="btn btn-primary width-6em">Send</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "EmailFormCard",
  data() {
    return {
      email: "",
    };
  },
};
</script>

<style scoped></style>
