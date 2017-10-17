import axios from '@/components/axios/'
import * as types from './mutationTypes'

function getSubject (name) {
  let subject = ''
  if (name.indexOf('math') >= 0) {
    subject = 'math'
  } else if (name.indexOf('physics') >= 0) {
    subject = 'physics'
  } else if (name.indexOf('chemistry') >= 0) {
    subject = 'chemistry'
  }
  return subject
}

/** 获取统计数据 */
export const getStatistics = ({ rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'statistics',
      params: {
        token: rootState.common.user.token,
        subject: getSubject(rootState.route.name),
        textbookId: params.textbookId
      }
    })
      .then((response) => {
        commit(types.STATISTICS, {'subject': getSubject(rootState.route.name), 'data': response.data.data})
        resolve(response)
      })
      .catch((e) => {
        reject(e)
      })
  })
}

/** 清空统计数据 */
export const clearStatistics = ({ rootState, commit }) => {
  commit(types.STATISTICS_RESET, {'subject': getSubject(rootState.route.name)})
}
