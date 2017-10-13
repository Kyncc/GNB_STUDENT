import axios from '@/components/axios/'
import * as types from './mutationTypes'

function getSubjectId (name) {
  let subjectId = ''
  if (name.indexOf('math') >= 0) {
    subjectId = '2'
  } else if (name.indexOf('physics') >= 0) {
    subjectId = '7'
  } else if (name.indexOf('chemistry') >= 0) {
    subjectId = '8'
  }
  return subjectId
}

/** 获取统计数据 */
export const getStatistics = ({ rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'report',
      params: {
        token: rootState.common.user.token,
        subject_id: getSubjectId(rootState.route.name)
      }
    })
      .then((response) => {
        commit(types.STATISTICS, {'subject': subject, 'data': response.data.data})
        resolve(response)
      })
  })
}
