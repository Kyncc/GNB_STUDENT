import axios from '@/components/axios/'
import * as types from './mutationTypes'

/** 获取章节数据 */
export const getReport = ({ rootState, commit }, params) => {
  let subjectId = (rootState.route.name.indexOf('math') !== -1 ? 2 : 7)
  let subject = (subjectId === 2 ? 'math' : 'physics')
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'report',
      params: {
        token: rootState.common.user.token,
        subject_id: subjectId
      }
    })
    .then((response) => {
      commit(types.REPORT, {'subject': subject, 'data': response.data.data})
      resolve(response)
    })
  })
}

/** 获取详细报表 */
export const getReportDetail = ({ rootState, commit }, params) => {
  let subjectId = (rootState.route.name.indexOf('math') !== -1 ? 2 : 7)
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'report/detail',
      params: {
        token: rootState.common.user.token,
        subject_id: subjectId,
        chapter_id: rootState.route.params.chapterId
      }
    })
    .then((response) => {
      commit(types.REPORT_DETAIL, response.data.data)
      resolve(response)
    })
  })
}

/** 浏览器高度 */
export const setReportScoll = ({ rootState, commit }, height) => {
  let subject = (rootState.route.name.indexOf('math') !== -1 ? 'math' : 'physics')
  commit(types.REPORT_SCROLL, {'subject': subject, 'height': height})
}

/** 清除详细数据 */
export const clearReportDetail = ({ commit }) => {
  commit(types.REPORT_DETAIL, [])
}
