import Api from '../config/httpdispatch'
import * as types from './mutationTypes'
import * as _ from '../config/whole'

/*获取用户信息*/
export const getUserInfo = ({ dispatch }, params) => {
  Api.getUserInfo({
    data: params,
    ok: response => {
      dispatch(types.GET_USER_INFO, response.data);
    },
    wrong: response => {
      dispatch(types.GET_USER_INFO, response.data);
    }
  })
}
