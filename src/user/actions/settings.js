import Api from '../../config/httpdispatch'
import * as types from '../mutationTypes'
import * as _ from '../../config/whole'

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