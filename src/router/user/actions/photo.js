import Api from '../../../config/httpdispatch'
import * as types from '../mutationTypes'
import * as _ from '../../../config/whole'

/*设置头像*/
export const setHeadPhoto = ({ dispatch }, params) => {
    dispatch(types.SET_USER_PHOTO, params)
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
