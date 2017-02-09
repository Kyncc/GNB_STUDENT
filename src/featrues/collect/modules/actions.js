import axios from 'config/http'
import * as types from './mutationTypes'
import * as _ from 'config/whole'





/**获取章节数据 */
export const getCollectExampleIds = ({ rootState,commit },params) => {
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


export const getCollectExampleIds = ({ commit }, params,success) => {
  Api.collectExampleIds({
    data:params,
    ok:response=>{
      commit(types.COLLECT_EXAMPLEIDS,response.data);
        success&&success();
    },
    wrong:response=>{
      _.toast(response.data.msg);
    }
  })
}

export const getCollectExampleList = ({ commit }, params,success,wrong) => {
  Api.exerciseList({
    data:params,
    ok:response=>{
      commit(types.COLLECT_EXAMPLELIST,response.data);
      success&&success();
    },
    wrong:response=>{
      _.toast(response.data.msg);
    }
  })
}



/**高度保存 */
export const setCollectScoll = ({ commit }, height) => {
  commit(types.COLLECT_INDEX_SCOLL,height);
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