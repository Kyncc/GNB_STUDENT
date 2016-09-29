import Api from '../config/httpdispatch'
import * as types from './mutationTypes'
import * as _ from '../config/whole'


export const getCollectExampleIds = ({ dispatch }, params,callback) => {
  Api.collectExampleIds({
      data:params,
      ok:response=>{
        dispatch(types.GET_COLLECT_EXAMPLEIDS_SUCCESS,response.data);
        callback(response.data);
      },
      wrong:response=>{
        dispatch(types.GET_COLLECT_EXAMPLEIDS_ERROR,response.data);
        _.toast(response.data.msg);
      }
  })
}

export const getCollectCameraIds = ({ dispatch }, params,callback) => {
  Api.collectCameraIds({
      data:params,
      ok:response=>{
        dispatch(types.GET_COLLECT_CAMERALEIDS_SUCCESS,response.data);
         callback();
      },
      wrong:response=>{
        dispatch(types.GET_COLLECT_CAMERALEIDS_ERROR,response.data);
        _.toast(response.data.msg);
      }
  })
}

export const getCollectExampleList = ({ dispatch }, params,success) => {
  Api.exerciseList({
      data:params,
      ok:response=>{
          dispatch(types.GET_COLLECT_EXAMPLELIST_SUCCESS,response.data);
          success&&success();
      },
      wrong:response=>{
        dispatch(types.GET_COLLECT_EXAMPLELIST_ERROR,response.data);
        _.toast(response.data.msg);
      }
  })
}

export const getCollectCameraList = ({ dispatch }, params) => {
  Api.cameraList({
      data:params,
      ok:response=>{
        dispatch(types.GET_COLLECT_CAMERALELIST_SUCCESS,response.data);
      },
      wrong:response=>{
        dispatch(types.GET_COLLECT_CAMERALELIST_ERROR,response.data);
        _.toast(response.data.msg);
      }
  })
}
