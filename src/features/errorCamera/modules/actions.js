import axios from '@/components/axios/'
import * as types from './mutationTypes'

/** 获取错题列表 */
export const getErrorCamera = ({ rootState, commit, state }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'camera/list',
      params: {
        token: rootState.common.user.token,
        subject_id: params.id,
        offset: state[params.subject]['offset']
      }
    })
      .then((response) => {
        commit(types.ERRORCAMERA, { subject: params.subject, data: response.data.data })
        resolve(response)
      })
  })
}

/** 设置例题错误类型 */
export const setErrorCameraType = ({ rootState, commit, state }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'camera/error',
      data: {
        token: rootState.common.user.token,
        id: params.id,
        errorComment: params.errorComment
      }
    })
      .then((response) => {
        commit(types.ERRORCAMERA_ERROR_TYPE, { subject: params.subject, index: params.index, errorComment: params.errorComment })
        resolve(response)
      })
  })
}

/** 高度保存 */
export const setErrorCameraScroll = ({ rootState, commit }, params) => {
  commit(types.ERRORCAMERA_SCROLL, { subject: params.subject, height: params.height })
}

/** 清空错题本 */
export const clearErrorCamera = ({ rootState, commit }) => {
  commit(types.ERRORCAMERA_RELOAD, { subject: 'math' })
  commit(types.ERRORCAMERA_RELOAD, { subject: 'physics' })
  commit(types.ERRORCAMERA_RELOAD, { subject: 'chemistry' })
}
