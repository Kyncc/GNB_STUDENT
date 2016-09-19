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

//点评
export const comment = ({ dispatch }, params) => {
  Api.comment({
      data:params,
      ok:response=>{
        dispatch(types.COMMENT_SUCCESS,response.data);
      },
      wrong:response=>{
        dispatch(types.COMMENT_ERROR,response.data);
        _.toast(response.data.msg);
      }
  })
}

//纠错
export const correct = ({ dispatch }, params) => {
  Api.correct({
      data:params,
      ok:response=>{
        dispatch(types.CORRECT_SUCCESS,response.data);
        _.toast(response.data.msg);
      },
      wrong:response=>{
        dispatch(types.CORRECT_ERROR,response.data);
        _.toast(response.data.msg);
      }
  })
}

//收藏
export const collectAdd = ({ dispatch }, params) => {
  Api.collectAdd({
      data:params,
      ok:response=>{
        dispatch(types.COLLECT_ADD_SUCCESS,response.data);
      },
      wrong:response=>{
        dispatch(types.COLLECT_ADD_ERROR,response.data);
        _.toast(response.data.msg);
      }
  })
}

//取消收藏
export const collectRemove = ({ dispatch }, params) => {
  Api.collectRemove({
      data:params,
      ok:response=>{
        dispatch(types.COLLECT_CANCEL_SUCCESS,response.data);
      },
      wrong:response=>{
        dispatch(types.COLLECT_CANCEL_ERROR,response.data);
        _.toast(response.data.msg);
      }
  })
}