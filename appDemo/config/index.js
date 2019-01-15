'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      "/": {
          // target: "http://172.23.24.227",
          // target: "http://192.168.58.160:9991", //单志林2
          // target: "http://192.168.46.126:9991", //单志林1 lab
          // target: "http://192.168.46.103:9991", //彭辉
          target: "http://clouddemo.hitevision.cn", // production server
          // pathRewrite: {
              // "^/": ""
          // } //后面可以使重写的新路径，一般不做更改
          pathRewrite: function(reqPath) {
              // console.log('req path: ', reqPath)
              let re = /(\/(index\.html)?$)|(^\/favicon)|(^\/gui\/)|(^\/browser\/websocet)/
              if (re.test(reqPath)) return reqPath
              return '/api' + reqPath
          }      
      }
  },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    
    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../../learn-cordova/www/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../../learn-cordova/www'),
    assetsSubDirectory: '',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
