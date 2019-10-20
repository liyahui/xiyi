module.exports = {
  devServer: {
    proxy: {
      '^/api/': {
        target: 'https://www.dchxx.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api/': '/'
        }
      }
    }
  }
}