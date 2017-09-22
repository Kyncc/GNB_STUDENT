import axios from '@/components/axios/'
import * as types from './mutationTypes'

/** 获取收藏例题 */
export const getCollect = ({ rootState, commit, state }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'collect',
      params: {
        token: rootState.common.user.token,
        subject_id: params.id,
        offset: state[params.subject]['offset']
      }
    })
      .then((response) => {
        commit(types.COLLECT_LIST, { subject: params.subject, data: response.data.data })
        resolve(response)
      })
  })
}

/** 高度保存 */
export const setCollectScroll = ({ rootState, commit }, params) => {
  commit(types.COLLECT_SCROLL, { subject: params.subject, height: params.height })
}

/** 清空收藏本 */
export const clearCollect = ({ commit }) => {
  commit(types.COLLECT_RELOAD)
}
