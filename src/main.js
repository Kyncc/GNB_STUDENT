import Vue from 'vue'
import 'babel-polyfill'
import store from './store'
import FastClick from 'fastclick'
import router from './router'
import VueLazyload from 'vue-lazyload'
import { ToastPlugin, LoadingPlugin, ConfirmPlugin, dateFormat } from 'vux'
import App from './App'

Vue.use(ToastPlugin) // 使用提醒
Vue.use(VueLazyload, { attempt: 3 }) // 图片异步加载
Vue.use(LoadingPlugin) // 使用Loading
Vue.use(ConfirmPlugin) // 使用Confirm
FastClick.attach(document.body) // 使用fastclick
Vue.config.productionTip = false

// 时间戳转换
Vue.filter('ymd', (value) => {
  return dateFormat(new Date(Number(`${value}000`)), 'YYYY-MM-DD')
})

// 错误类型注入
Vue.filter('errorType', (value) => {
  switch (value) {
    case -1: return '错误类型'
    case 1: return '审题不清'
    case 2: return '概念模糊'
    case 3: return '思路不清'
    case 4: return '运算错误'
    case 5: return '粗心大意'
    case 6: return '方法不对'
    case 7: return '时间不够'
    case 0: return '我不知道'
  }
})

// 在首页返回键失效其他页面则直接返回上一页
document.addEventListener('plusready', () => {
  let first = null
  plus.navigator.setStatusBarBackground('#4BB7AA') // 设置状态栏颜色
  // HACK 解决HTML5+ IOS<vedio>标签默认扬声器线路输出问题
  setTimeout(() => {
    let audio = plus.audio.createPlayer('233.mp3') // 没有这个音频也不需要处理
    audio.setRoute(plus.audio.ROUTE_SPEAKER)
    audio.play(() => { }, (e) => { })
  }, 500)
  /**
   * TODO
   * 1. 在主页，书包，我的页面下1秒内2次BACK键退出APP
   * 2. 其他页面则返回上一页
   */
  plus.key.addEventListener('backbutton', () => {
    if (store.state.route.path === '/index' || store.state.route.path === '/bag' || store.state.route.path === '/login' || store.state.route.path === '/user') {
      if (!first) {
        first = new Date().getTime()
        Vue.$vux.toast.show({ text: '再按一次退出', type: 'text', time: 1500, position: 'bottom' })
        setTimeout(() => { first = null }, 1000)
      } else if (new Date().getTime() - first < 1000) {
        plus.runtime.quit()
      }
    } else {
      history.back()
    }
  }, false)
})

let app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')

export default app
