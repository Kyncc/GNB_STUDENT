import Api from '../config/httpdispatch'
import * as types from './mutationTypes'
import * as _ from '../config/whole'

import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router();
/*获取短信验证码(注册账号)*/
export const getRegisterCode = ({ dispatch }, params) => {
  Api.getCode({
      data:params,
      ok:response=>{
        dispatch(types.GET_REGISTER_MESSAGE_SUCCESS,response.data);
      },
      wrong:response=>{
        dispatch(types.GET_REGISTER_MESSAGE_ERROR,response.data);
      }
  })
}

/*设置登陆密码*/
export const addPwd = ({ dispatch }, params) => {
  Api.addPwd({
      data:params,
      ok:response=>{
        dispatch(types.SET_PASSWORD_SUCCESS,response.data);
        router.replace('/');
      },
      wrong:response=>{
        dispatch(types.SET_PASSWORD_ERROR,response.data);
         _.toast(response.data.msg);
      }
  })
}

/*用户登陆*/
export const login = ({ dispatch }, params,success,wrong) => {
  Api.login({
      data:params,
      ok:response=>{
        dispatch(types.GET_LOGIN_SUCCESS,response.data);
        success&&success();
        // router.replace('/main');
      },
      wrong:response=>{
        dispatch(types.GET_LOGIN_FAILED,response.data);
        wrong&&wrong();
        _.toast(response.data.msg);
      }
  })
}

/*获取短信验证码(忘记密码)*/
export const getForgetCode = ({ dispatch }, params) => {
  Api.getCode({
      data:params,
      ok:response=>{
        dispatch(types.GET_FORGET_MESSAGE_SUCCESS,response.data);
      },
      wrong:response=>{
        dispatch(types.GET_FORGET_MESSAGE_ERROR,response.data);
        _.toast(response.data.msg);
      }
  })
}

/*重置登陆密码*/
export const resetPwd = ({ dispatch }, params) => {
  Api.resetPwd({
      data:params,
      ok:response=>{
        dispatch(types.RESET_PASSWORD_SUCCESS,response.data);
        router.replace('/');
      },
      wrong:response=>{
        dispatch(types.RESET_PASSWORD_ERROR,response.data);
        _.toast(response.data.msg);
      }
  })
}

/*编辑用户信息*/
export const setUserInfo = ({ dispatch }, params, success,wrong) => {
  Api.updateUserInfo({
    data: params,
    ok: response => {
        success&&success()
    },
    wrong: response => {
        wrong&&wrong()
    }
  })
}

export const setHeadImg = ({ dispatch }, params) => {
    dispatch(types.SET_HEAD_IMG, params)
}
