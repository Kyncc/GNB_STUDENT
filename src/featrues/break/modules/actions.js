import axios from 'config/http'
import * as types from './mutationTypes'
import * as _ from 'config/whole'

/**获取章节数据 */
export const getBreak = ({ rootState,commit },params) => {
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
      commit(types.BREAK,response.data);
      resolve(response);
    })
  });
}

/**索引对应手风琴的打开关闭 */
export const breakChangeChapter = ({ commit },index) => {
  commit(types.BREAK_STATE_CHANGE,index);
}

/**浏览器高度 */
export const setBreakScroll = ({ commit },height) => {
  commit(types.BREAK_SCOLLER,height);
}

/**清除刷题型数据 */
export const clearBreak = ({ commit }) => {
  commit(types.BREAK_CLEAR);
}

/**更换科目 */
export const setBreakSubject = ({ commit }, id) => {
  commit(types.BREAK_CHANGE_SUBJECT,id);
  commit(types.BREAK_CLEAR);
}

/**获取弃题列表 */
export const getBreakList = ({ state,rootState,commit }, params) => {
  return new Promise((resolve, reject)=> { 
    axios({
      method:'get',
      url: 'summary/list-loose-win-exercise',
      params: {
        "status":1,
        "token":rootState.login.token,
        "chapter_id":rootState.route.params.chapterId,
        "subject_id":state.subjectId,
        "offset":state.list.offset
      }
    })
    .then((response) => {
      commit(types.BREAK_LIST,response.data.data);
      resolve(response);
    })
  })
}


/**弃题列表撤回 */
export const breakAction = ({ state,rootState,commit }, params) => {
  return new Promise((resolve, reject)=> { 
    axios({
      method:'get',
      url: 'summary/delete-loose-win-exercise',
      params: {
        "loose_win_excercise_id":params.id,
        "token":rootState.login.token,
        "subject_id":state.subjectId
      }
    })
    .then((response) => {
      commit(types.BREAK_LIST_BACK,params.index);
      resolve(response);
    })
  })
}

/**清空列表 */
export const breakListClear = ({ commit }) => {
  commit(types.BREAK_LIST_CLEAR);
}

/**设置列表高度 */
export const setBreakListScroll = ({ commit },height) => {
  commit(types.BREAK_LIST_SCOLLER,height);
}

