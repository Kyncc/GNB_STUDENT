import Api from '../config/httpdispatch'
import * as types from './mutationTypes'
import * as _ from '../config/whole'


export const getCollectExampleIds = ({ dispatch }, params) => {
  Api.collectExampleIds({
      data:params,
      ok:response=>{
        dispatch(types.GET_COLLECT_EXAMPLEIDS_SUCCESS,response.data);
      },
      wrong:response=>{
        dispatch(types.GET_COLLECT_EXAMPLEIDS_ERROR,response.data);
        _.toast(response.data.msg);
      }
  })
}

export const getCollectCameraIds = ({ dispatch }, params) => {
  Api.collectCameraIds({
      data:params,
      ok:response=>{
        dispatch(types.GET_COLLECT_CAMERALEIDS_SUCCESS,response.data);
      },
      wrong:response=>{
        dispatch(types.GET_COLLECT_CAMERALEIDS_ERROR,response.data);
        _.toast(response.data.msg);
      }
  })
}

export const getCollectExampleList = ({ dispatch }, params) => {
  Api.collectExampleList({
      data:params,
      ok:response=>{
        dispatch(types.GET_COLLECT_EXAMPLELIST_SUCCESS,response.data);
      },
      wrong:response=>{
        dispatch(types.GET_COLLECT_EXAMPLELIST_ERROR,response.data);
        _.toast(response.data.msg);
      }
  })
}

export const getCollectCameraList = ({ dispatch }, params) => {
  Api.collectCameraList({
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