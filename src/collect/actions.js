import Api from '../config/httpdispatch'
import * as types from './mutationTypes'
import * as _ from '../config/whole'


export const getCollectExampleIds = ({ dispatch }, params,callback) => {
  Api.collectExampleIds({
      data:params,
      ok:response=>{
        dispatch(types.GET_COLLECT_EXAMPLEIDS,response.data);
        callback(response.data);
      },
      wrong:response=>{
        _.toast(response.data.msg);
      }
  })
}

export const getCollectCameraIds = ({ dispatch }, params,success,wrong) => {
  Api.collectCameraIds({
      data:params,
      ok:response=>{
        dispatch(types.GET_COLLECT_CAMERALEIDS,response.data);
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
          dispatch(types.GET_COLLECT_EXAMPLELIST,response.data);
          success&&success();
      },
      wrong:response=>{
        _.toast(response.data.msg);
      }
  })
}

export const getCollectCameraList = ({ dispatch }, params,success,wrong) => {
  Api.cameraList({
      data:params,
      ok:response=>{
        dispatch(types.GET_COLLECT_CAMERALELIST,response.data);
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
          dispatch(types.GET_COLLECT_EXAMPLEDETAIL,response.data);
          success&&success();
      },
      wrong:response=>{
        _.toast(response.data.msg);
      }
  })
}

/**获取收藏拍错题详情 */
export const getCollectCameraDetail = ({ dispatch }, params,success,wrong) => {
  Api.cameraList({
      data:params,
      ok:response=>{
          dispatch(types.GET_COLLECT_CAMERADETAIL,response.data);
          success&&success();
      },
      wrong:response=>{
        _.toast(response.data.msg);
      }
  })
}

/**高度保存 */
export const setScoll = ({ dispatch }, height) => {
    dispatch(types.COLLECT_SCOLL,height);
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