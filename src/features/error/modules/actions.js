import axios from '@/components/axios/'
import * as types from './mutationTypes'

/** 获取错题列表 */
export const getError = ({ rootState, commit, state }, params) => {
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
        commit(types.ERROR, { subject: subject, data: response.data.data })
        resolve(response)
      })
  })
}

/** 设置例题错误类型 */
export const setErrorType = ({ rootState, commit, state }, params) => {
  let subject = (rootState.route.name.indexOf('math') !== -1 ? 'math' : 'physics')
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'error/type',
      data: {
        token: rootState.common.user.token,
        wbeid: params.wbeid,
        chapterId: params.chapterId,
        type: params.type
      }
    })
      .then((response) => {
        commit(types.ERROR_ERROR_TYPE, { subject: subject, index: params.index, type: params.type })
        resolve(response)
      })
  })
}

/** 高度保存 */
export const setErrorScroll = ({ rootState, commit }, height) => {
  let subject = (rootState.route.name.indexOf('math') !== -1 ? 'math' : 'physics')
  commit(types.ERROR_SCROLL, { subject: subject, height: height })
}

/** 清空错题本 */
export const clearError = ({ rootState, commit }) => {
  commit(types.ERROR_RELOAD, { subject: 'math' })
  commit(types.ERROR_RELOAD, { subject: 'physics' })
}

/** 获取错题详情 */
export const getErrorDetail = ({ rootState, commit, state }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'error/detail',
      params: {
        token: rootState.common.user.token,
        chapterId: rootState.route.params.chapterId,
        eid: rootState.route.params.eid,
        nth: state.detial.list.length + 1 // 总共3题加载
      }
    })
      .then((response) => {
        commit(types.ERROR_DETAIL, { data: response.data.data })
        resolve(response)
      })
  })
}

/** 错题详情高度保存 */
export const setErrorDetailScroll = ({ rootState, commit }, height) => {
  commit(types.ERROR_DETAIL_SCROLL, { height: height })
}

/** 清空错题详情 */
export const clearErrorDetail = ({ rootState, commit }) => {
  commit(types.ERROR_DETAIL_RELOAD)
}

/** 获取错题关联列表 */
export const getErrorCorrelation = ({ rootState, commit, state }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'error/correlation',
      params: {
        id: rootState.route.params.id,
        token: rootState.common.user.token
      }
    })
      .then((response) => {
        commit(types.ERROR_DETAIL_CORRELATION, { index: params.index, data: response.data.data })
        resolve(response)
      })
  })
}

/** 设置例题错误 */
export const setErrorExampleWrong = ({ rootState, commit, state }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'error/setExample',
      data: {
        token: rootState.common.user.token,
        eid: rootState.route.params.eid,
        id: rootState.route.params.id
      }
    })
      .then((response) => {
        // 错误的索引
        commit(types.ERROR_EXAMPLE_ERROR, { index: params.index })
        resolve(response)
      })
  })
}
