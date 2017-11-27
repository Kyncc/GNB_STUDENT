const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    vendor: [
      'axios',
      'babel-polyfill',
      'fastclick',
      'vue/dist/vue.esm.js',
      'vue-router',
      'vue-lazyload',
      'vuex',
      'vuex-router-sync'
    ]
  },
  output: {
    path: path.join(__dirname, '../static/js'),
    filename: '[name].dll.js',
    library: '[name]_library' // vendor.dll.js中暴露出的全局变量名
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '.', '[name]-manifest.json'),
      name: '[name]_library'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
}
