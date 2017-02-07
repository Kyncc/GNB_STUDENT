import axios from 'config/http'
import * as types from './mutationTypes'
import * as _ from 'config/whole'

/**获取章节数据 */
export const getPass = ({ rootState,commit },params) => {
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
      commit(types.PASS,response.data);
      resolve(response);
    })
  });
}

/**索引对应手风琴的打开关闭 */
export const passChangeChapter = ({ commit },index) => {
  commit(types.PASS_STATE_CHANGE,index);
}

/**浏览器高度 */
export const setPassScroll = ({ commit },height) => {
  commit(types.PASS_SCROLL,height);
}

/**清除刷题型数据 */
export const clearPass = ({ commit }) => {
  commit(types.PASS_CLEAR);
}

/**更换科目 */
export const setPassSubject = ({ commit }, id) => {
  commit(types.PASS_CHANGE_SUBJECT,id);
  commit(types.PASS_CLEAR);
}

/**获取弃题列表 */
export const getPassList = ({ state,rootState,commit }, params) => {
  return new Promise((resolve, reject)=> { 
    axios({
      method:'get',
      url: 'summary/list-loose-win-exercise',
      params: {
        "status":2,
        "token":rootState.login.token,
        "chapter_id":rootState.route.params.chapterId,
        "subject_id":state.subjectId,
        "offset":state.list.offset
      }
    })
    .then((response) => {
      commit(types.PASS_LIST,response.data.data);
      resolve(response);
    })
  });
}

/**清空列表 */
export const passListClear = ({ commit }) => {
  commit(types.PASS_LIST_CLEAR);
}

/**设置列表高度 */
export const setPassListScroll = ({ commit },height) => {
  commit(types.PASS_LIST_SCROLL,height);
}

