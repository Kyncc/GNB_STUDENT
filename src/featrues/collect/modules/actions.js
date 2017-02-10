import axios from 'config/http'
import * as types from './mutationTypes'
import * as _ from 'config/whole'


/**获取收藏例题ID */
export const getCollect = ({ rootState,commit,state },params) => {
  return new Promise((resolve, reject)=> { 
    axios({
      method:'get',
      url: 'collect/example',
      params: {
        "token":rootState.login.token,
        "subject_id":state.subjectId,
        "offset":state.example.offset
      }
    })
    .then((response) => {
      commit(types.COLLECT_LIST,response.data.data);
      resolve(response);
    })
  })
}

/**高度保存 */
export const setCollectScroll = ({ commit }, height) => {
  commit(types.COLLECT_SCROLL,height);
}

/**更换科目 */
export const setCollectSubject = ({ commit }, id) => {
  commit(types.COLLECT_SUBJECT_CHANGE,id);
  commit(types.COLLECT_RELOAD);
}

/**清空收藏本 */
export const clearCollect = ({ commit }) => {
  commit(types.COLLECT_RELOAD);
}