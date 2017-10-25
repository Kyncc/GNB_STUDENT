import axios from '@/components/axios/'
import * as types from './mutationTypes'

/** 获取错题评价 */
export const getComment = ({ rootState, commit, state }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'error/getComment',
      params: {
        token: rootState.common.user.token,
        wbeid: rootState.route.params.wbeid
      }
    }).then((response) => {
      commit(types.COMMENT, { data: response.data.data })
      resolve(response)
    })
  })
}

/** 错题评价清空 */
export const clearComment = ({ commit }) => {
  commit(types.COMMENT_RELOAD)
}
