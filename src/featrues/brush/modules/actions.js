import axios from 'config/http'
import * as types from './mutationTypes'
import * as _ from 'config/whole'

/**获取章节数据 */
export const getBrush = ({ rootState,commit },params) => {
  return new Promise((resolve, reject)=> { 
    axios({
      method:'get',
      url: 'summary',
      params: {
        "textbook_id":params.textbook_id,
        "token":rootState.login.token
      }
    })
    .then((response) => {
      commit(types.BRUSH,response.data.data)
      resolve(response)
    })
  })
}

/**索引对应手风琴的打开关闭 */
export const brushChangeChapter = ({ commit },index) => {
  commit(types.BRUSH_STATE_CHANGE,index)
}

/**浏览器高度 */
export const setBrushScroll = ({ commit },height) => {
  commit(types.BRUSH_SCOLLER,height)
}

/**清除刷题型数据 */
export const clearBrush = ({ commit }) => {
  commit(types.BRUSH_CLEAR)
}

/**更换科目 */
export const setBrushSubject = ({ commit }, id) => {
  commit(types.BRUSH_CHANGE_SUBJECT,id)
  commit(types.BRUSH_CLEAR)
}

/**获取刷题列表 */
export const getBrushList = ({ state,rootState,commit }, params) => {
  return new Promise((resolve, reject)=> { 
    axios({
      method:'get',
      url: 'summary/list-exercises',
      params: {
        "token":rootState.login.token,
        "chapter_id":rootState.route.params.chapterId,
        "subject_id":state.subjectId,
        "offset":state.list.offset
      }
    })
    .then((response) => {
      commit(types.BRUSH_LIST,response.data.data)
      resolve(response)
    })
  })
}

/**斩弃题动作 */
export const brushAction =({ state,rootState,commit }, params) => {
  return new Promise((resolve, reject)=> { 
    axios({
      method:'get',
      url: 'summary/loose-win-exercise',
      params: {
        "excercise_id":params.id,
        "chapter_id":rootState.route.params.chapterId,
        "status":params.status,
        "subject_id":state.subjectId,
        "token":rootState.login.token
      }
    })
    .then((response) => {
      commit(types.BRUSH_ACTION,params.index)
      resolve(response)
    })
  })
}

/**清空列表 */
export const brushListClear = ({ commit }) => {
  commit(types.BRUSH_LIST_CLEAR)
}

/**设置列表高度 */
export const setBrushListScroll = ({ commit },height) => {
  commit(types.BRUSH_LIST_SCOLLER,height)
}

