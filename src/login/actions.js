import Api from '../config/httpdispatch'
import * as types from './mutationTypes'


/* 获取短信验证码*/
export const getCode = ({ dispatch }, params) => {
  Api.getCode(params).then(response => {
    dispatch(types.GET_MESSAGE_SUCCESS,response.data);
  }, err => {
     dispatch(types.GET_MESSAGE_ERROR, err);
  })
}

/*用户登陆*/
export const login = ({ dispatch }, params) => {
  



  // Api.login(params).then(response => {
  //   if(response.data.code != 200){
  //       dispatch(types.GET_LOGIN_FAILED,response.data.msg);
  //   }else{
  //      dispatch(types.GET_LOGIN_SUCCESS,response.data);
  //   }
  // }), err => {
  //    dispatch(types.GET_LOGIN_ERROR, err);
  // }
}
