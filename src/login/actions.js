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
