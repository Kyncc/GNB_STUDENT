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
      method: 'get',
      url: API_PATHS.getCode,
      data: params.data,
      ok: params.ok,
      wrong: params.wrong
    });
  },
  login: (params) => {
    return http({
      method: 'get',
      url: API_PATHS.login,
      data: params.data,
      ok: params.ok,
      wrong: params.wrong
    });
  },
  addPwd: (params) => {
    return http({method: 'get',url: API_PATHS.addPwd,data: params.data,ok: params.ok, wrong: params.wrong});
  },
  resetPwd: (params) => {
    return http({
      method: 'get',
      url: API_PATHS.resetPwd,
      data: params.data,
      ok: params.ok,
      wrong: params.wrong
    });
  },
  //收藏本
  collectExample: (params) => {
    return http({method: 'get',url: API_PATHS.collectExample,data: params.data,ok: params.ok, wrong: params.wrong});
  },
  collectCamera: (params) => {
    return http({method: 'get',url: API_PATHS.collectCamera,data: params.data,ok: params.ok, wrong: params.wrong});
  },
  getUserInfo: (params) => {
    return http({
      method: 'get',
      url: API_PATHS.getUserInfo,
      data: params.data,
      ok: params.ok,
      wrong: params.wrong
    });
  }
}

export function http(params) {
  _.busy();
  Vue.resource(params.url).get(params.data)
    .then(resp => {
      console.log(resp);
      if (resp.code == 401) {
        window.location.href = '/login';
      }
      return resp;
    })
    .then(resp => {
      if (resp.data.code == 200) {
        params.ok(resp);
      } else {
        params.wrong(resp);
      }
      _.leave();
      return resp;
    }, err => {
      console.log('Network Error:', err);
      _.leave();
      _.toast('接口异常');
      return err;
    })
    .catch(err => {
      console.log(err);
    });
}
