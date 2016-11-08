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
  addUserInfo: (params) => {
    return http({ method: 'post', url: API_PATHS.addInfo, data: params.data, ok: params.ok, wrong: params.wrong });
  },
  getTextbookVer: (params) => {
    return http({ method: 'get', url: API_PATHS.textbookVersion, data: params.data, ok: params.ok, wrong: params.wrong });
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
  /**收藏本模块
   *  collectExampleIds:收藏习题IDS
   *  collectCameraIds:收藏拍错题IDS
   * **/
  collectExampleIds: (params) => {
    return http({ method: 'get', url: API_PATHS.collectExampleIds, data: params.data, ok: params.ok, wrong: params.wrong });
  },
  collectCameraIds: (params) => {
    return http({ method: 'get', url: API_PATHS.collectCameraIds, data: params.data, ok: params.ok, wrong: params.wrong });
  },
   /**拍错题模块
   *  camera:拍错题搜索
   *  cameraImportant:拍错题设为例题
   *  cameraSearch:拍错题匹配
   *  cameraHistory:拍错题记录
   *  cameraRemove:例题删除
   */
  camera: (params) => {
    return http({ method: 'post', url: API_PATHS.camera, data: params.data, ok: params.ok, wrong: params.wrong });
  },
  cameraHistory: (params) => {
    return http({ method: 'get', url: API_PATHS.cameraHistory, data: params.data, ok: params.ok, wrong: params.wrong });
  },
  cameraRemove: (params) => {
    return http({ method: 'post', url: API_PATHS.cameraRemove, data: params.data, ok: params.ok, wrong: params.wrong });
  },
  cameraImportant: (params) => {
    return http({ method: 'post', url: API_PATHS.cameraImportant, data: params.data, ok: params.ok, wrong: params.wrong });
  },
  cameraMatch: (params) => {
    return http({ method: 'post', url: API_PATHS.cameraMatch, data: params.data, ok: params.ok, wrong: params.wrong });
  },
  /**归纳本模块
   *  error:归纳本首页获取数据
   *  errorList:归纳本错题列表
   *  errorMore:归纳本首更多习题
   *  errorRecommend:归纳本推荐习题
   */
  error: (params) => {
    return http({ method: 'get', url: API_PATHS.error, data: params.data, ok: params.ok, wrong: params.wrong });
  },
  errorList: (params) => {
    return http({ method: 'get', url: API_PATHS.errorList, data: params.data, ok: params.ok, wrong: params.wrong });
  },
  errorMore: (params) => {
    return http({ method: 'get', url: API_PATHS.errorMore, data: params.data, ok: params.ok, wrong: params.wrong });
  },
  errorRecommend: (params) => {
    return http({ method: 'get', url: API_PATHS.errorRecommend, data: params.data, ok: params.ok, wrong: params.wrong });
  },
  errorRecommendPost: (params) => {
    return http({ method: 'post', url: API_PATHS.errorRecommendPost, data: params.data, ok: params.ok, wrong: params.wrong });
  },
  /**互动模块
   * msg:消息首页
   * msgSystem:系统消息
   * msgClass:班级消息
   * msgCorrect:纠错消息
   */
  msg: (params) => {
    return http({ method: 'get', url: API_PATHS.msg, data: params.data, ok: params.ok, wrong: params.wrong });
  },
  msgCorrect: (params) => {
    return http({ method: 'get', url: API_PATHS.msgCorrect, data: params.data, ok: params.ok, wrong: params.wrong });
  },
  msgClass: (params) => {
    return http({ method: 'get', url: API_PATHS.msgClass, data: params.data, ok: params.ok, wrong: params.wrong });
  },
  msgSystem: (params) => {
    return http({ method: 'get', url: API_PATHS.msgSystem, data: params.data, ok: params.ok, wrong: params.wrong });
  },
  
  //获取用户信息
  getUserInfo: (params) => {
    return http({ method: 'get', url: API_PATHS.getUserInfo, data: params.data, ok: params.ok, wrong: params.wrong })
  },
  //编辑用户信息
  updateUserInfo: (params) => {
    return http({ method: 'post', url: API_PATHS.updateUserInfo, data: params.data, ok: params.ok, wrong: params.wrong })
  },
   /**我的班级
   * myClassList:获取班级列表
   * myClassmateList:班级成员名单
   * myClassInto:加入班级
   * myClassSearch:搜索班级
   */
  myClassList: (params) => {
    return http({ method: 'get', url: API_PATHS.myClassList, data: params.data, ok: params.ok, wrong: params.wrong })
  },
  myClassmateList: (params) => {
    return http({ method: 'get', url: API_PATHS.myClassmateList, data: params.data, ok: params.ok, wrong: params.wrong })
  },
  myClassInto: (params) => {
    return http({ method: 'post', url: API_PATHS.myClassInto, data: params.data, ok: params.ok, wrong: params.wrong })
  },
  myClassSearch: (params) => {
    return http({ method: 'post', url: API_PATHS.myClassSearch, data: params.data, ok: params.ok, wrong: params.wrong })
  },
  /** 全部练习册*/
  workbookList: (params) => {
    return http({ method: 'get', url: API_PATHS.userWorkbookAll, data: params.data, ok: params.ok, wrong: params.wrong })
  },
  /** 我的练习册*/
  workbook: (params) => {
    return http({ method: 'get', url: API_PATHS.userWorkbook, data: params.data, ok: params.ok, wrong: params.wrong })
  },
  /** 增加练习册*/
  workbookAdd: (params) => {
    return http({ method: 'post', url: API_PATHS.userWorkbookAdd, data: params.data, ok: params.ok, wrong: params.wrong })
  },
  /** 删除练习册*/
  workbookDel: (params) => {
    return http({ method: 'post', url: API_PATHS.userTextbookDel, data: params.data, ok: params.ok, wrong: params.wrong })
  },
  /** 搜索练习册*/
  workbookSearch: (params) => {
    return http({ method: 'post', url: API_PATHS.userWorkbookSearch, data: params.data, ok: params.ok, wrong: params.wrong })
  },
  /** 全部教材*/
  textbookList: (params) => {
    return http({ method: 'get', url: API_PATHS.userTextbookAll, data: params.data, ok: params.ok, wrong: params.wrong })
  },
  /** 我的教材*/
  textbook: (params) => {
    return http({ method: 'get', url: API_PATHS.userTextbook, data: params.data, ok: params.ok, wrong: params.wrong })
  },
  /** 增加教材*/
  textbookAdd: (params) => {
    return http({ method: 'post', url: API_PATHS.userTextbookAdd, data: params.data, ok: params.ok, wrong: params.wrong })
  },
  /** 删除教材*/
  textbookDel: (params) => {
    return http({ method: 'post', url: API_PATHS.userTextbookDel, data: params.data, ok: params.ok, wrong: params.wrong })
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
    return http({ method: 'get', url: API_PATHS.getInviteStudentList, data: params.data, ok: params.ok, wrong: params.wrong })
  },
  //绑定邀请码
  bindInviteCode: (params) => {
    return http({ method: 'post', url: API_PATHS.bindInviteCode, data: params.data, ok: params.ok, wrong: params.wrong })
  },
  //获取邀请码
  getInviteCode: (params) => {
    return http({ method: 'get', url: API_PATHS.getInviteCode, data: params.data, ok: params.ok, wrong: params.wrong })
  },
  //积分账单
  numerical: (params) => {
    return http({ method: 'get', url: API_PATHS.numerical, data: params.data, ok: params.ok, wrong: params.wrong })
  },
  //我的账单
  payList: (params) => {
    return http({ method: 'get', url: API_PATHS.payList, data: params.data, ok: params.ok, wrong: params.wrong })
  },
  //会员信息
  member: (params) => {
    return http({ method: 'get', url: API_PATHS.member, data: params.data, ok: params.ok, wrong: params.wrong })
  },
  //退出
  quitToken: (params) => {
    return http({ method: 'get', url: API_PATHS.quitToken, data: params.data, ok: params.ok, wrong: params.wrong })
  },
  //检查版本
  updateVersion: (params) => {
    return http({ method: 'get', url: API_PATHS.updateVersion, data: params.data, ok: params.ok, wrong: params.wrong })
  },
  headImg: (params) => {
    return http({ method: 'post', url: API_PATHS.headImg, data: params.data, ok: params.ok, wrong: params.wrong })
  }
}

export function http(params) {
  // _.busy();
  let resource;
  if (params.method == 'post') {
    resource = Vue.http.post(params.url, params.data, {
      emulateJSON: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
      // headers: {
      //   'Content-Type': 'application/json'
      // },
      // _timeout: 3000,
      // onTimeout: (request) => {
      //   _.toast("服务器繁忙");
      //   _.leave();
      // }
    })
  } else {
     resource = Vue.http.get(params.url,{
        params:params.data,
        _timeout: 5000,
        onTimeout: (request) => {
          _.toast("服务器繁忙");
          _.leave();
        }
     })
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
            _.toast(resp.data.msg);
          params.wrong(resp);
        }
        // _.leave();
        return resp;
      }, err => {
      console.log('Network Error:', err);
      if(err.data.msg){
          _.toast(err.data.msg)
      }else{
          _.toast('接口异常')
      }
      _.leave();
      // _.toast(JSON.parse(err.body).msg);
      return err;
    })
    .catch(err => {
      console.log(err);
    });
}
