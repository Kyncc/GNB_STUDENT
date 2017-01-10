import Api from '../../config/httpdispatch'
import * as _ from '../../config/whole'
import * as types from '../mutationTypes'

/** 注册账号短信验证码*/
export const getRegisterCode = ({ dispatch }, params,success,wrong) => {
  Api.registerCode({
      data:params,
      ok:response=>{
        dispatch(types.REGISTER_MESSAGE,response.data);
        success&&success(response);
      },
      wrong:response=>{
         _.toast(response.data.msg);
      }
  })
}

/** 设置登陆密码(注册账号)*/
export const addPwd = ({ dispatch }, params,success,wrong) => {
  Api.addPwd({
      data:params,
      ok:response=>{
        dispatch(types.SET_PASSWORD,response.data);
        success&&success();
      },
      wrong:response=>{
        _.toast(response.data.msg);
        wrong&&wrong();
      }
  })
}

/** 设置用户信息*/
export const setUserInfo = ({ dispatch }, params,success,wrong) => {
  Api.addUserInfo({
    data: params,
    ok: response => {
        success&&success()
    },
    wrong: response => {
        _.toast(response.data.msg);
        wrong&&wrong();
    }
  })
}

