import Api from '../config/httpdispatch'
import * as types from './mutationTypes'
import * as _ from '../config/whole'

/*获取短信验证码(注册账号)*/
export const getRegisterCode = ({ dispatch }, params) => {
  Api.getCode({
      data:params,
      ok:response=>{
        dispatch(types.GET_REGISTER_MESSAGE_SUCCESS,response.data);
      },
      wrong:response=>{
        dispatch(types.GET_REGISTER_MESSAGE_ERROR,response);
        _.toast(response.msg);
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
        dispatch(types.GET_FORGET_MESSAGE_ERROR,response);
        _.toast(response.msg);
      }
  })
}

/*用户登陆*/
export const login = ({ dispatch }, params) => {
  Api.login({
      data:params,
      ok:response=>{
        dispatch(types.GET_LOGIN_SUCCESS,response.data);
      },
      wrong:response=>{
        dispatch(types.GET_LOGIN_FAILED,response);
        _.toast('账号或密码错误');
      }
  })
}

/*设置登陆密码*/
export const addPwd = ({ dispatch }, params) => {
  Api.addPwd({
      data:params,
      ok:response=>{
        dispatch(types.SET_PASSWORD_SUCCESS,response);
      },
      wrong:response=>{
        dispatch(types.SET_PASSWORD_ERROR,response);
        _.toast(response.msg);
      }
  })
}

/*重置登陆密码*/
export const resetPwd = ({ dispatch }, params) => {
  Api.resetPwd({
      data:params,
      ok:response=>{
        dispatch(types.RESET_PASSWORD_SUCCESS,response);
      },
      wrong:response=>{
        dispatch(types.RESET_PASSWORD_ERROR,response);
        _.toast(response.msg);
      }
  })
}