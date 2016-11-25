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
            localStorage.removeItem('headImg');
            localStorage.removeItem('mobile');
            localStorage.removeItem('name');
            localStorage.removeItem('token');
            localStorage.removeItem('isVip');
            localStorage.removeItem('balance');
            localStorage.removeItem('numerical');
            localStorage.removeItem('subjectType');
        },
        wrong: response => {
            _.leave();
            _.toast(response.data.msg);
        }
    })
}