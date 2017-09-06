import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'

axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL = 'https://www.guinaben.com/student/'

// POST传参序列化
axios.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    VERSION: '3.3.0'
  }
  if (config.method === 'post') {
    config.data = qs.stringify(config.data, {arrayFormat: 'brackets'})
  }
  return config
}, (error) => {
  Vue.$vux.toast.show({text: '非法输入', type: 'text', time: 1500, position: 'bottom'})
  return Promise.reject(error)
})

axios.interceptors.response.use((res) => {
  // token失效得判断
  if (res.data.code === 401) {
    localStorage.removeItem('token')
    Vue.$vux.toast.show({text: res.data.msg, type: 'warn', time: 1500, isShowMask: true})
    setTimeout(() => {
      try {
        plus.runtime.restart() // 重启应用
      } catch (e) {
        window.location.href = '/login'
      }
    }, 500)
    return Promise.reject(res)
  } else if (res.data.code === 403) {
    // 升级的代码
    Vue.$vux.alert.show({
      title: '更新',
      content: '据说新增功能666',
      onHide () {
        if (/iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())) {
          plus.runtime.openURL('itms-apps://itunes.apple.com/cn/app/gui-na-ben-xue-sheng-duan/id1184077595?l=en&mt=8')
        } else {
          window.location.href = 'market://details?id=com.sanbao.guinaben.student'
        }
      }
    })
  } else if (res.data.code !== 200) {
    Vue.$vux.toast.show({text: res.data.msg, type: 'text', time: 1500, position: 'bottom'})
    return Promise.reject(res)
  }
  return res
}, (error) => {
  Vue.$vux.toast.show({text: '网络异常', type: 'text', time: 1500, position: 'bottom'})
  return Promise.reject(error)
})

export default axios
