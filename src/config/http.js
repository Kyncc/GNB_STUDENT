import axios from 'axios'
import qs from 'qs'
import * as _ from './whole'
import 'es6-promise/auto'

axios.defaults.timeout = 8000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = 'http://www.guinaben.com:8070/student/';
// axios.defaults.baseURL = 'http://www.guinaben.com/api/student/';
// axios.defaults.baseURL = 'http://192.168.13.222:90/edu_api/student';

//POST传参序列化
axios.interceptors.request.use((config) => {
  if(config.method  === 'post'){
    config.data = qs.stringify(config.data,{arrayFormat:'brackets'});
  }
  return config;
},(error) =>{
   _.toast("错误的传参");
  return Promise.reject(error);
});

//code状态码200判断
axios.interceptors.response.use((res) =>{
  if(res.data.code != '200'){
    _.toast(res.data.msg);
    return Promise.reject(res);
  }
  return res;
}, (error) => {
  _.toast("网络异常");
  _.leave();
  return Promise.reject(error);
});

export default axios;