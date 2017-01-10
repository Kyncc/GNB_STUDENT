import Api from '../../config/httpdispatch'
import * as _ from '../../config/whole'
import * as types from './mutationTypes'

export const getCollectExampleIds = ({ dispatch }, params,success) => {
  Api.collectExampleIds({
      data:params,
      ok:response=>{
        dispatch(types.COLLECT_EXAMPLEIDS,response.data);
        success&&success();
      },
      wrong:response=>{
        _.toast(response.data.msg);
      }
  })
}

export const getCollectExampleList = ({ dispatch }, params,success,wrong) => {
  Api.exerciseList({
      data:params,
      ok:response=>{
          dispatch(types.COLLECT_EXAMPLELIST,response.data);
          success&&success();
      },
      wrong:response=>{
        _.toast(response.data.msg);
      }
  })
}

/**获取收藏习题详情 */
export const getCollectExampleDetail = ({ dispatch }, params,success,wrong) => {
  Api.exerciseList({
      data:params,
      ok:response=>{
          dispatch(types.COLLECT_EXAMPLEDETAIL,response.data);
          success&&success();
      },
      wrong:response=>{
        _.toast(response.data.msg);
      }
  })
}


/**高度保存 */
export const setScoll = ({ dispatch }, height) => {
    dispatch(types.COLLECT_INDEX_SCOLL,height);
}

/**更换科目 */
export const setSubject = ({ dispatch }, id) => {
    dispatch(types.COLLECT_SUBJECT_CHANGE,id);
    dispatch(types.COLLECT_RELOAD);
}

/**清空收藏本 */
export const clearCollect = ({ dispatch }) => {
    dispatch(types.COLLECT_RELOAD);
}