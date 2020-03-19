module.exports = {
  /* css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/scss/global.scss";`
      }
    }
  } */
  configureWebpack: {
    resolve: {
      mainFields: ["main", "module"],
    },
  },
};
