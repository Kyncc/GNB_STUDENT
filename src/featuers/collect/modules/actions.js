import axios from '@/components/axios/'
import * as types from './mutationTypes'

/** 获取收藏例题ID */
export const getCollect = ({rootState, commit, state}, params) => {
  let subjectId
  rootState.route.name === 'math' ? subjectId = 2 : subjectId = 7
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'collect/example',
      params: {
        token: rootState.common.user.token,
        subject_id: subjectId,
        offset: state[rootState.route.name].offset
      }
    })
    .then((response) => {
      commit(types.COLLECT_LIST, {'subject': rootState.route.name, 'data': response.data.data})
      resolve(response)
    })
  })
}

/** 高度保存 */
export const setCollectScroll = ({rootState, commit}, height) => {
  commit(types.COLLECT_SCROLL, {'subject': rootState.route.name, 'height': height})
}

/** 清空收藏本 */
export const clearCollect = ({rootState, commit}) => {
  commit(types.COLLECT_RELOAD, {'subject': rootState.route.name})
}
