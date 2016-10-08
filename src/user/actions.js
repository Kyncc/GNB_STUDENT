import Api from '../config/httpdispatch'
import * as types from './mutationTypes'
import * as _ from '../config/whole'

/*获取用户信息*/
export const getUserInfo = ({ dispatch }, params, callback) => {
    Api.getUserInfo({
      data: params,
      ok: response => {
        dispatch(types.GET_USER_INFO, response.data.data)
        callback()
      },
      wrong: response => {
        dispatch(types.GET_USER_INFO, response.data.data)
      }
    })
  }
  /*编辑用户信息*/
export const updateUserInfo = ({ dispatch }, params, callback) => {
  Api.updateUserInfo({
    data: params,
    ok: response => {
      callback()
        //dispatch(types.GET_USER_INFO, response.data)
    },
    wrong: response => {
      //dispatch(types.GET_USER_INFO, response.data)
    }
  })
}


//获取班级列表
export const myClassList = ({ dispatch }, params) => {
    Api.myClassList({
      data: params,
      ok: response => {
        dispatch(types.GET_CLASS_LIST, response.data.data)
      },
      wrong: response => {
        dispatch(types.GET_CLASS_LIST, response.data.data)
      }
    })
  }
  //修改密码
export const updatePwd = ({ dispatch }, params, callback) => {
    Api.updatePwd({
      data: params,
      ok: response => {
        callback()
      },
      wrong: response => {}
    })
  }
  //反馈
export const advice = ({ dispatch }, params, callback) => {
    Api.advice({
      data: params,
      ok: response => {
        callback()
      },
      wrong: response => {}
    })
  }
  //反馈列表
export const adviceHistory = ({ dispatch }, params, callback) => {
    Api.adviceHistory({
      data: params,
      ok: response => {
        dispatch(types.GET_ADVICE_LIST, response.data.data)
        callback()
      },
      wrong: response => {}
    })
  }
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
  //检查版本
export const updateVersion = ({ dispatch }, params, callback) => {
  Api.updateVersion({
    data: params,
    ok: response => {
      dispatch(types.GET_VERSION, response.data.data)
      callback()
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
