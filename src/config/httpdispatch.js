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
    return http({ method: 'get', url: API_PATHS.getCode, data: params.data, ok: params.ok, wrong: params.wrong });
  },
  login: (params) => {
    return http({ method: 'get', url: API_PATHS.login, data: params.data, ok: params.ok, wrong: params.wrong });
  },
  addPwd: (params) => {
    return http({ method: 'get', url: API_PATHS.addPwd, data: params.data, ok: params.ok, wrong: params.wrong });
  },
  resetPwd: (params) => {
    return http({ method: 'get', url: API_PATHS.resetPwd, data: params.data, ok: params.ok, wrong: params.wrong });
  },
  //首页
  index: (params) => {
    return http({ method: 'get', url: API_PATHS.index, data: params.data, ok: params.ok, wrong: params.wrong });
  },
  //添加收藏
  collectAdd: (params) => {
    return http({ method: 'post', url: API_PATHS.collectAdd, data: params.data, ok: params.ok, wrong: params.wrong });
  },
  //取消收藏
  collectRemove: (params) => {
    return http({ method: 'post', url: API_PATHS.collectRemove, data: params.data, ok: params.ok, wrong: params.wrong });
  },
  //评注
  comment: (params) => {
    return http({ method: 'post', url: API_PATHS.comment, data: params.data, ok: params.ok, wrong: params.wrong });
  },
  //纠错
  correct: (params) => {
    return http({ method: 'post', url: API_PATHS.correct, data: params.data, ok: params.ok, wrong: params.wrong });
  },
  //拍错题列表
  cameraList: (params) => {
    return http({ method: 'get', url: API_PATHS.cameraList, data: params.data, ok: params.ok, wrong: params.wrong });
  },
  //习题列表
  exerciseList: (params) => {
    return http({ method: 'get', url: API_PATHS.exerciseList, data: params.data, ok: params.ok, wrong: params.wrong });
  },
  //收藏本
  collectExampleIds: (params) => {
    return http({ method: 'get', url: API_PATHS.collectExampleIds, data: params.data, ok: params.ok, wrong: params.wrong });
  },
  collectCameraIds: (params) => {
    return http({ method: 'get', url: API_PATHS.collectCameraIds, data: params.data, ok: params.ok, wrong: params.wrong });
  },
  /**互动模块
   * msgSystem:系统消息
   * msgClass:班级消息
   * msgCorrect:纠错消息
   */
  msgCorrect: (params) => {
    return http({ method: 'get', url: API_PATHS.msgSystem, data: params.data, ok: params.ok, wrong: params.wrong });
  },
  msgClass: (params) => {
    return http({ method: 'get', url: API_PATHS.msgClass, data: params.data, ok: params.ok, wrong: params.wrong });
  },
  msgSystem: (params) => {
    return http({ method: 'get', url: API_PATHS.msgCorrect, data: params.data, ok: params.ok, wrong: params.wrong });
  },
  //获取用户信息
  getUserInfo: (params) => {
    return http({ method: 'get', url: API_PATHS.getUserInfo, data: params.data, ok: params.ok, wrong: params.wrong })
  },
  //编辑用户信息
  updateUserInfo: (params) => {
    return http({ method: 'post', url: API_PATHS.updateUserInfo, data: params.data, ok: params.ok, wrong: params.wrong })
  },
  //获取班级列表
  myClassList: (params) => {
    return http({ method: 'get', url: API_PATHS.myClassList, data: params.data, ok: params.ok, wrong: params.wrong })
  },
  //获取班级成员名单
  myClassmateList: (params) => {
    return http({ method: 'get', url: API_PATHS.myClassmateList, data: params.data, ok: params.ok, wrong: params.wrong })
  },
  //修改密码
  updatePwd: (params) => {
    return http({ method: 'post', url: API_PATHS.updatePwd, data: params.data, ok: params.ok, wrong: params.wrong })
  },
  //反馈
  advice: (params) => {
    return http({ method: 'post', url: API_PATHS.advice, data: params.data, ok: params.ok, wrong: params.wrong })
  },
  //反馈历史
  adviceHistory: (params) => {
    return http({ method: 'get', url: API_PATHS.adviceHistory, data: params.data, ok: params.ok, wrong: params.wrong })
  },
  //受邀同学
  getInviteStudentList: (params) => {
    return http({ method: 'post', url: API_PATHS.getInviteStudentList, data: params.data, ok: params.ok, wrong: params.wrong })
  },
  //绑定邀请码
  bindInviteCode: (params) => {
    return http({ method: 'post', url: API_PATHS.bindInviteCode, data: params.data, ok: params.ok, wrong: params.wrong })
  },
  //获取邀请码
  getInviteCode: (params) => {
    return http({ method: 'get', url: API_PATHS.getInviteCode, data: params.data, ok: params.ok, wrong: params.wrong })
  },
}

export function http(params) {
  _.busy();
  let resource;
  if (params.method == 'post') {
    resource = Vue.http.post(params.url, params.data, {
      emulateJSON: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
  } else {
    resource = Vue.resource(params.url).get(params.data);
  }
  resource
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
