import Api from '../config/httpdispatch'
import * as types from './mutationTypes'
import * as _ from '../config/whole'


export const getCollectExampleIds = ({ dispatch }, params) => {
  Api.collectExample({
      data:params,
      ok:response=>{
        dispatch(types.GET_COLLECT_EXAMPLEIDS_SUCCESS,response.data);
        //触发拉题
      },
      wrong:response=>{
        dispatch(types.GET_COLLECT_EXAMPLEIDS_ERROR,response.data);
        _.toast(response.data.msg);
      }
  })
}

export const getCollectCameraIds = ({ dispatch }, params) => {
  Api.collectCamera({
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

