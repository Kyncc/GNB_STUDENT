import Vue from 'vue'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import { ToastPlugin, LoadingPlugin, ConfirmPlugin, dateFormat, AlertPlugin } from 'vux'

Vue.use(ToastPlugin) // 使用轻提醒框
Vue.use(AlertPlugin)
Vue.use(VueLazyload, { attempt: 3 }) // 图片异步加载
Vue.use(LoadingPlugin) // 使用Loading
Vue.use(ConfirmPlugin) // 使用Confirm
FastClick.attach(document.body) // 使用fastclick

// 时间戳转换
Vue.filter('ymd', (value) => {
  return dateFormat(new Date(Number(`${value}000`)), 'YYYY-MM-DD')
})

// 时间戳转换分秒
Vue.filter('ymdhms', (value) => {
  return dateFormat(new Date(Number(`${value}000`)), 'YYYY-MM-DD HH:mm:ss')
})

// 学科的转换
Vue.filter('subject', (value) => {
  switch (value) {
    case 2: return '数学'
    case 7: return '物理'
    case 8: return '化学'
  }
})
