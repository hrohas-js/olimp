const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/style/_variables.scss";`
      }
    }
  },
  configureWebpack: config => {
    return {
      devServer: {
        proxy: {
          '/api': {
            target: 'https://kladr-api.ru',
            //secure: false,
            changeOrigin: true
          }
        }
      }
    }
  }
})