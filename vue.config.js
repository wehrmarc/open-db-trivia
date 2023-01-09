const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "~tailwindcss/base";\n@import "~tailwindcss/components";\n@import "~tailwindcss/utilities";'
      }
    }
  },
  transpileDependencies: [
    'vuex-module-decorators'
  ]
});