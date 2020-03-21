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
  devServer: {
    overlay: {
      warnings: false,
      errors: false,
    },
  },
  lintOnSave: process.env.NODE_ENV !== "production",
};
