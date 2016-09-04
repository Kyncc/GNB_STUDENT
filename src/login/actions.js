import Api from '../config/httpdispatch'
import * as types from './mutationTypes'
import * as _ from '../config/whole'

/* 获取短信验证码*/
export const getCode = ({ dispatch }, params) => {
  Api.getCode({
      data:params,
      ok:response=>{
        dispatch(types.GET_MESSAGE_SUCCESS,response.data);
      },
      wrong:response=>{
        dispatch(types.GET_MESSAGE_ERROR,response);
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
