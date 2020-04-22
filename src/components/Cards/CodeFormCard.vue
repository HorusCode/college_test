<template>
  <div class="card codeForm login--form">
    <div class="card-content">
      <header class="card-header">
        <h3 class="text-center mx-1">
          Write
          <span class="text-primary">code</span>
          your account
        </h3>
      </header>
      <form>
        <div class="input-line">
          <label for="code" class="input-label">Code</label>
          <div class="input-group">
            <span class="mdi mdi-code-brackets pos-left" />
            <input id="code" v-model="code" type="text" class="input" />
          </div>
        </div>
        <div class="d-flex justify-content-between">
          <span class="label-link" @click="$emit('showform', '.codeForm', '.loginForm')">
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
  name: 'CodeFormCard',
  data() {
    return {
      code: '',
    };
  },
};
</script>

<style scoped></style>
