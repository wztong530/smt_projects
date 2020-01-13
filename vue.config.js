module.exports = {
  // publicPath: process.env.NODE_ENV === 'production' ? '/gylContent/' : './',
  publicPath: './',
  assetsDir: 'public',
  devServer: {
    disableHostCheck: false,
    host: "0.0.0.0",
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        // target: 'http://192.168.1.198:8081/xbokenter',  //目标接口域名
        target: 'https://mall.xpaik.com/smdouyin',  //目标接口域名
        changeOrigin: true,  //是否跨域
        pathRewrite: {
          '^/api': ''   //重写接口
        }
      }
    }
  }
}