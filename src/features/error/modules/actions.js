import axios from '@/components/axios/'
import * as types from './mutationTypes'

/** 获取收藏例题 */
export const getError = ({rootState, commit, state}, params) => {
  let subjectId = (rootState.route.name.indexOf('math') !== -1 ? 2 : 7)
  let subject = (rootState.route.name.indexOf('math') !== -1 ? 'math' : 'physics')
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'error',
      params: {
        token: rootState.common.user.token,
        subject_id: subjectId,
        offset: state[subject]['offset']
      }
    })
    .then((response) => {
      commit(types.ERROR_LIST, {subject: subject, data: response.data.data})
      resolve(response)
    })
  })
}

/** 高度保存 */
export const setErrorScroll = ({rootState, commit}, height) => {
  let subject = (rootState.route.name.indexOf('math') !== -1 ? 'math' : 'physics')
  commit(types.ERROR_SCROLL, {subject: subject, height: height})
}

/** 清空错题本 */
export const clearError = ({rootState, commit}) => {
  let subject = (rootState.route.params.subjectId === '2' ? 'math' : 'physics')
  commit(types.ERROR_RELOAD, {subject: subject})
}
