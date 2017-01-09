import Api from '../config/httpdispatch'
import * as types from './mutationTypes'
import * as _ from '../config/whole'

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
