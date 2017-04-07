import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import 'es6-promise/auto'

axios.defaults.timeout = 8000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencodedcharset=UTF-8'
axios.defaults.baseURL = 'http://www.guinaben.com:8070/student/'
// axios.defaults.baseURL = 'http://192.168.13.222:90/edu_api/student'

// POST传参序列化
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data, {
      arrayFormat: 'brackets'
    })
  }
  return config
}, (error) => {
  Vue.$vux.toast.show({text: '非法输入', type: 'text', time: 1000, position: 'bottom'})
  return Promise.reject(error)
})

// code状态码200判断
axios.interceptors.response.use((res) => {
  if (res.data.code !== '200') {
    Vue.$vux.toast.show({text: res.data.msg, type: 'text', time: 1000, position: 'bottom'})
    return Promise.reject(res)
  }
  return res
}, (error) => {
  Vue.$vux.toast.show({text: '网络异常', type: 'text', time: 1000, position: 'bottom'})
  return Promise.reject(error)
})

export default axios
