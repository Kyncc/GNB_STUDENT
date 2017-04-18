import Vue from 'vue'
import store from './store'
import FastClick from 'fastclick'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'
import {ToastPlugin, LoadingPlugin, ConfirmPlugin, dateFormat} from 'vux'

Vue.use(ToastPlugin)    // 使用提醒
Vue.use(VueLazyload)    // 图片异步加载
Vue.use(LoadingPlugin)  // 使用Loading
Vue.use(ConfirmPlugin)  // 使用Confirm
FastClick.attach(document.body)   // 使用fastclick
Vue.config.productionTip = false

// 时间戳转换
Vue.filter('ymd', (value) => {
  return dateFormat(new Date(Number(`${value}000`)), 'YYYY-MM-DD')
})

let app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')

export default app
