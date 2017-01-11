import Api from '../config/httpdispatch'
import * as types from './mutationTypes'
import * as _ from '../config/whole'

/*设置头像*/
export const setHeadPhoto = ({ dispatch }, params) => {
    dispatch(types.SET_USER_PHOTO, params)
}

/*获取用户信息*/
export const getUserInfo = ({ dispatch }, params, success,wrong) => {
  _.busy();
  Api.getUserInfo({
    data: params,
    ok: response => {
        dispatch(types.GET_INFO,response.data)
        success&&success();
        _.leave();
    },
    wrong: response => {
        _.toast("获取用户信息失败");
        _.leave();
    }
  })
}

/*编辑头像*/
export const postHeadImg = ({ dispatch }, params, success,wrong) => {
  _.busy();
  Api.headImg({
    data: params,
    ok: response => {
        success(response.data.data);
        _.leave();
    },
    wrong: response => {
        _.toast(response.data.msg);
        _.leave();
    }
  })
}
