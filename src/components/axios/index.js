import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'

axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL = 'https://www.guinaben.com/student/'
// axios.defaults.baseURL = 'http://192.168.13.222:90/edu_api/student'

// POST传参序列化
axios.interceptors.request.use((config) => {
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
