import Vue from 'vue'
import store from './store'
import FastClick from 'fastclick'
import App from './App'
import router from './router'
import {ToastPlugin, LoadingPlugin, ConfirmPlugin} from 'vux'

Vue.use(ToastPlugin)    // 使用提醒
Vue.use(LoadingPlugin)  // 使用Loading
Vue.use(ConfirmPlugin)  // 使用Confirm
FastClick.attach(document.body)   // 使用fastclick
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
