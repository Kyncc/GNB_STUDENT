import axios from '@/components/axios/'
import * as types from './mutationTypes'

/** 班级消息列表 */
export const getMessageClass = ({ rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'message',
      params: {
        token: rootState.common.user.token,
        type: 'class'
      }
    }).then((response) => {
      commit(types.MESSAGE_CLASS, response.data.data)
      resolve(response)
    })
  })
}

/** 系统消息列表 */
export const getMessageSystem = ({ rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'message',
      params: {
        token: rootState.common.user.token,
        type: 'system'
      }
    }).then((response) => {
      commit(types.MESSAGE_SYSTEM, response.data.data)
      resolve(response)
    })
  })
}

/** 纠错消息列表 */
export const getMessageCorrect = ({ rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'message',
      params: {
        token: rootState.common.user.token,
        type: 'correct'
      }
    }).then((response) => {
      commit(types.MESSAGE_CORRECT, response.data.data)
      resolve(response)
    })
  })
}

/** 清除消息 */
export const clearMessage = ({ commit }) => {
  commit(types.MESSAGE_CLEAR)
}
