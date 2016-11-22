import Api from '../config/httpdispatch'
import * as types from './mutationTypes'
import * as _ from '../config/whole'


  //受邀同学
export const getInviteStudentList = ({ dispatch }, params,success) => {
    Api.getInviteStudentList({
      data: params,
      ok: response => {
        dispatch(types.GET_INVITE_STUDENT_LIST, response.data.data);
        success()
      },
      wrong: response => {
        _.toast("异常请求");
      }
    })
  }
  //邀请码
export const getInviteCode = ({ dispatch }, params) => {
    Api.getInviteCode({
      data: params,
      ok: response => {
        dispatch(types.GET_INVITE_CODE, response.data.data.inviteCode)
      },
      wrong: response => {}
    })
  }
  //绑定邀请码
export const bindInviteCode = ({ dispatch }, params, callback) => {
    Api.bindInviteCode({
      data: params,
      ok: response => {
        callback()
      },
      wrong: response => {
      }
    })
  }
  //我的积分
export const numerical = ({ dispatch }, params,callback) => {
    Api.numerical({
      data: params,
      ok: response => {
        dispatch(types.GET_NUMERICAL_LIST, response.data.data)
        callback()
      },
      wrong: response => {}
    })
  }
  //我的账单
export const payList = ({ dispatch }, params) => {
    Api.payList({
      data: params,
      ok: response => {
        dispatch(types.GET_BILL_LIST, response.data.data)
      },
      wrong: response => {}
    })
  }
  //会员信息
export const member = ({ dispatch }, params) => {
    Api.member({
      data: params,
      ok: response => {
        dispatch(types.GET_MEMBER_INFO, response.data.data)
      },
      wrong: response => {}
    })
  }

//退出
export const quitToken = ({ dispatch }, params, callback) => {
  Api.quitToken({
    data: params,
    ok: response => {
        callback()
    },
    wrong: response => {
    }
  })
}
