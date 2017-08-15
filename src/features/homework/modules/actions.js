import * as types from './mutationTypes'
import axios from '@/components/axios/'

/** 获取消息列表 */
export const getHomework = ({ rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'homework',
      params: {
        token: rootState.common.user.token,
        subjectId: params.subjectId
      }
    }).then((response) => {
      commit(types.HOMEWORK, {subjectId: params.subjectId, data: response.data.data})
      resolve(response)
    }).catch((e) => {
      reject(e)
    })
  })
}

/** 清空作业 */
export const clearHomework = ({rootState, commit}) => {
  commit(types.HOMEWORK_RESET)
}
