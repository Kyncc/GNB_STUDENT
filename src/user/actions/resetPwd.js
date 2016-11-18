import Api from '../../config/httpdispatch'
import * as types from '../mutationTypes'
import * as _ from '../../config/whole'

/** 修改密码*/
export const updatePwd = ({ dispatch }, params, success) => {
    _.busy();
    Api.updatePwd({
        data: params,
        ok: response => {
            _.leave();
            success&&success();
        },
        wrong: response => {
            _.toast(response.data.msg);
        }
    })
}