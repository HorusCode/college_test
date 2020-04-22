<template>
  <div id="app">
    <div v-if="processing" id="preloader">
      <span class="loader">
        <span class="loader-inner" />
      </span>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    processing() {
      return this.$store.getters.getProcessing;
    },
  },
};
</script>
