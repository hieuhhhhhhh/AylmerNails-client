const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new (require("webpack").DefinePlugin)({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false), // or true, depending on your needs
      }),
    ],
  },
});
