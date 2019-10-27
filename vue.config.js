module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/xiyi' : '/',
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