import axios from '@/components/axios/'
import * as types from './mutationTypes'

/** 获取章节数据 */
export const getInduce = ({rootState, commit}, params) => {
  let subject = (rootState.route.name.includes('math') ? 'math' : 'physics')
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'summary',
      params: {
        textbook_id: '200',
        token: rootState.common.user.token
      }
    })
    .then((response) => {
      commit(types.INDUCE, {'subject': subject, 'data': response.data.data})
      resolve(response)
    })
  })
}

/** 首页章节浏览器高度 */
export const setInduceScroll = ({ rootState, commit }, height) => {
  let subject = (rootState.route.name.includes('math') ? 'math' : 'physics')
  commit(types.INDUCE_SCOLLER, {'subject': subject, 'height': height})
}

/** 清除章节数据 */
export const clearInduce = ({ rootState, commit }) => {
  let subject = (rootState.route.name.includes('math') ? 'math' : 'physics')
  commit(types.INDUCE_CLEAR, {'subject': subject})
}

/** 获取刷题列表 */
export const getInduceList = ({state, rootState, commit}, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'summary/list-exercises',
      params: {
        token: rootState.common.user.token,
        chapter_id: rootState.route.params.chapterId,
        subject_id: state.subjectId,
        offset: state.list.offset
      }
    })
    .then((response) => {
      commit(types.INDUCE_LIST, response.data.data)
      resolve(response)
    })
  })
}

/** 题目动作 */
export const induceAction = ({ state, rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'summary/loose-win-exercise',
      params: {
        excercise_id: params.id,
        chapter_id: rootState.route.params.chapterId,
        status: params.status,
        subject_id: state.subjectId,
        token: rootState.common.user.token
      }
    })
    .then((response) => {
      commit(types.INDUCE_ACTION, params.index)
      resolve(response)
    })
  })
}

/** 清空列表 */
export const induceListClear = ({ rootState, commit }) => {
  commit(types.INDUCE_LIST_CLEAR, {'subject': rootState.route.name})
}

/** 设置列表高度 */
export const setInduceListScroll = ({ rootState, commit }, height) => {
  commit(types.INDUCE_LIST_SCOLLER, {'subject': rootState.route.name, 'height': height})
}
