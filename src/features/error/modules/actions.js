import axios from '@/components/axios/'
import * as types from './mutationTypes'

/** 获取错题列表 */
export const getError = ({ rootState, commit, state }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'error',
      params: {
        token: rootState.common.user.token,
        subject_id: params.id,
        offset: state[params.subject]['offset']
      }
    })
      .then((response) => {
        commit(types.ERROR, { subject: params.subject, data: response.data.data })
        resolve(response)
      })
  })
}

/** 设置例题错误类型 */
export const setErrorType = ({ rootState, commit, state }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'error/type',
      data: {
        token: rootState.common.user.token,
        wbeid: params.wbeid,
        chapterId: params.chapterId,
        errorComment: params.errorComment
      }
    })
      .then((response) => {
        commit(types.ERROR_ERROR_TYPE, { subject: params.subject, index: params.index, errorComment: params.errorComment })
        resolve(response)
      })
  })
}

/** 高度保存 */
export const setErrorScroll = ({ rootState, commit }, params) => {
  commit(types.ERROR_SCROLL, { subject: params.subject, height: params.height })
}

/** 清空错题本 */
export const clearError = ({ rootState, commit }) => {
  commit(types.ERROR_RELOAD, { subject: 'math' })
  commit(types.ERROR_RELOAD, { subject: 'physics' })
  commit(types.ERROR_RELOAD, { subject: 'chemistry' })
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

/** 获取错题评价 */
export const getErrorComment = ({ rootState, commit, state }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'error/getComment',
      params: {
        token: rootState.common.user.token,
        wbeid: rootState.route.params.wbeid
      }
    }).then((response) => {
      commit(types.ERROR_COMMENT, { data: response.data.data })
      resolve(response)
    })
  })
}

/** 错题评价清空 */
export const setErrorCommentClear = ({ commit }) => {
  commit(types.ERROR_COMMENT_RELOAD)
}
