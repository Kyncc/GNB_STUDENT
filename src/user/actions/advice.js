import Api from '../../config/httpdispatch'
import * as types from '../mutationTypes'
import * as _ from '../../config/whole'


//反馈
export const advice = ({ dispatch }, params, success) => {
    _.busy();
    Api.advice({
        data: params,
        ok: response => {
            _.leave();
            success&&success()
        },
        wrong: response => {}
    })
}
  //反馈列表
export const adviceHistory = ({ dispatch }, params, success) => {
  Api.adviceHistory({
    data: params,
    ok: response => {
      dispatch(types.GET_ADVICE_LIST, response.data.data)
      success&&success()
    },
    wrong: response => {}
  })
}

