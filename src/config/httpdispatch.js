import Vue from 'vue'
import VueResource from 'vue-resource'
import store from '../store'
import {
    API_PATHS,
    OK_CODE,
    UNAUTHORIZED_CODE
} from './api';

Vue.use(VueResource)

export default {
  getCode: (params) => {
    return Vue.resource(API_PATHS.getCode).get(params)
  },
  login: (params) => {
    return http({
      method:'get',
      url:API_PATHS.login,
      data:params.data,
      ok:params.ok,
      wrong:params.wrong
    });
  }
}

export function http(params){
  if(params.method == 'post'){
      const promise = Vue.resource(params.url).post(params.data);
  }else{
      const promise = Vue.resource(params.url).get(params.data);
  }
  store.dispatch('GET_LOADING', true);
  store.dispatch('GET_TOAST_SHOW', false);

  Vue.resource(params.url).get(params.data)
      .then(resp => { 
            if (resp.code == 401) {
                window.location.href = '/login';
            }
            return resp.data;
      })
      .then(resp => {
           if (resp.code === OK_CODE) {
                params.ok(resp.data);
           }else{
                params.wrong(resp);
           }
           store.dispatch('GET_LOADING', false);
        } 
     ,err => {
          console.log('Network Error:', err);
          store.dispatch('GET_LOADING', false);
          store.dispatch('GET_TOAST_SHOW', true); 
          store.dispatch('GET_TOAST_MESSAGE','接口异常'); 
      })
      .catch(err => {
          console.log(err);
      });
}
