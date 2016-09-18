import * as types from './mutationTypes'
import * as _ from '../config/whole'
import Api from '../config/httpdispatch'

export const getToastMsg = ({ dispatch }, msg) => {
    dispatch(types.GET_TOAST_MESSAGE,msg);
}

export const getToastShow = ({ dispatch }, status) => {
    dispatch(types.GET_TOAST_SHOW,status);
}

export const getIsLoading = ({ dispatch }, status)=> {
    dispatch(types.GET_LOADING,status);
}

export const getExampleList = ({ dispatch }, status)=> {
     Api.exampleList({
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

export const getCameraList = ({ dispatch }, status)=> {
     Api.cameraList({
      data:params,
      ok:response=>{
        dispatch(types.GET_COLLECT_CAMERALIST_SUCCESS,response.data);
      },
      wrong:response=>{
        dispatch(types.GET_COLLECT_CAMERALIST_ERROR,response.data);
        _.toast(response.data.msg);
      }
  })
}