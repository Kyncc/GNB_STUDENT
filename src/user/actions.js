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
      wrong: response => {
      }
    })
  }
  //反馈
export const advice = ({ dispatch }, params, callback) => {
  Api.advice({
    data: params,
    ok: response => {
      callback()
    },
    wrong: response => {
    }
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
    wrong: response => {
    }
  })
}
