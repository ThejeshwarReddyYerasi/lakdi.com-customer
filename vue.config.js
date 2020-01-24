module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      '^/backend': {
        target: 'http://10.177.69.50:8762/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {'^/backend' : ''}
      }
    }
  },
  lintOnSave: true
}