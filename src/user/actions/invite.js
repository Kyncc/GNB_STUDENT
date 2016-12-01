import Api from '../../config/httpdispatch'
import * as types from '../mutationTypes'
import * as _ from '../../config/whole'

  //受邀同学
export const getInviteStudentList = ({ dispatch }, params,success,wrong) => {
    Api.getInviteStudentList({
      data: params,
      ok: response => {
        dispatch(types.INVITE_STUDENT_LIST, response.data.data);
       success&&success()
      },
      wrong: response => {
        wrong&&wrong()
        _.toast(response.data.msg);
      }
    })
  }
  //邀请码
export const getInvite = ({ dispatch }, params,success,wrong) => {
  Api.getInviteCode({
    data: params,
    ok: response => {
      success&&success()
      dispatch(types.INVITE, response.data.data)
    },
    wrong: response => {
      wrong&&wrong()
      _.toast(response.data.msg);
    }
  })
}
  //绑定邀请码
export const bindInviteCode = ({ dispatch }, params, success,wrong) => {
  Api.bindInviteCode({
    data: params,
    ok: response => {
      success&&success()
    },
    wrong: response => {
      wrong&&wrong()
      _.toast(response.data.msg);
    }
  })
}

