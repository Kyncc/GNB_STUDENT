import Api from '../config/httpdispatch'
import * as types from './mutationTypes'
import store from '../store'

/* 获取短信验证码*/
export const getCode = ({ dispatch }, params) => {
  Api.getCode({
      data:params,
      ok:response=>{
        dispatch(types.GET_MESSAGE_SUCCESS,response);
      },
      wrong:response=>{
        dispatch(types.GET_MESSAGE_ERROR,response);
        store.dispatch('GET_TOAST_SHOW',true);  
        store.dispatch('GET_TOAST_MESSAGE', response.msg);
      }
  })

  // Api.getCode(params).then(response => {
  //   dispatch(types.GET_MESSAGE_SUCCESS,response.data);
  // }, err => {
  //    dispatch(types.GET_MESSAGE_ERROR, err);
  // })
}

/*用户登陆*/
export const login = ({ dispatch }, params) => {
  Api.login({
      data:params,
      ok:response=>{
        dispatch(types.GET_LOGIN_SUCCESS,response);
      },
      wrong:response=>{
        dispatch(types.GET_LOGIN_FAILED,response);
        store.dispatch('GET_TOAST_SHOW',true);  
        store.dispatch('GET_TOAST_MESSAGE', '账号或密码错误');
      }
  })
}
