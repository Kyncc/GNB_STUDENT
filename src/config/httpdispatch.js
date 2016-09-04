import Vue from 'vue'
import VueResource from 'vue-resource'
import * as _ from './whole.js'
import {
    API_PATHS,
    OK_CODE,
    UNAUTHORIZED_CODE
} from './api';

Vue.use(VueResource)

export default {
  getCode: (params) => {
   return http({
      method:'get',
      url:API_PATHS.getCode,
      data:params.data,
      ok:params.ok,
      wrong:params.wrong
    });
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
  _.busy();
  Vue.resource(params.url).get(params.data)
      .then(resp => { 
            if (resp.code == 401) {
                window.location.href = '/login';
            }
            return resp;
      })
      .then(resp => {
           if (resp.code === OK_CODE) {
                params.ok(resp.data);
           }else{
                params.wrong(resp);
           }
           _.leave();
        } 
     ,err => {
          console.log('Network Error:', err);
          _.leave();
          _.toast('接口异常');
      })
      .catch(err => {
          console.log(err);
      });
}

