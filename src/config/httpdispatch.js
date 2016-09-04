import Vue from 'vue'
import VueResource from 'vue-resource'
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
  promise
      .then(resp => { 
            if (resp.code == 401) {
                window.location.href = '/login';
            }
            return resp;
      })
      .then(resp => {
           if (resp.code === OK_CODE) {
                params.ok && params.ok(resp.data);
           }else{
                params.wrong && params.wrong(resp);
           }
        } 
     ,err => {
          console.log('Network Error:', err);
      })
      .catch(err => {
          console.log(err);
      });
}
