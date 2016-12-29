import Api from '../config/httpdispatch'
import * as types from './mutationTypes'
import {SET_HEAD_IMG} from './../login/mutationTypes'

import * as _ from '../config/whole'


export const setHeadPhoto = ({ dispatch }, params) => {
    dispatch(types.SET_HEAD_PHOTO, params)
}

/*编辑头像*/
export const postHeadImg = ({ dispatch }, params, success,wrong) => {
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
