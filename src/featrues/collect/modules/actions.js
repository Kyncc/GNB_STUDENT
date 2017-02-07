import axios from 'config/http'
import * as types from './mutationTypes'
import * as _ from 'config/whole'

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
export const setScoll = ({ commit }, height) => {
  commit(types.COLLECT_INDEX_SCOLL,height);
}

/**更换科目 */
export const setSubject = ({ commit }, id) => {
  commit(types.COLLECT_SUBJECT_CHANGE,id);
  commit(types.COLLECT_RELOAD);
}

/**清空收藏本 */
export const clearCollect = ({ commit }) => {
  commit(types.COLLECT_RELOAD);
}