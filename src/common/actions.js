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
        setTimeout(()=>{
          history.back();
        },1000);
         _.toast("点评成功");
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
        _.toast("纠错成功");
        setTimeout(()=>{
          history.back();
        },1000);
      },
      wrong:response=>{
        dispatch(types.CORRECT_ERROR,response.data);
        _.toast(response.data.msg);
      }
  })
}

//收藏
export const collectAdd = ({ dispatch }, params,callback) => {
  Api.collectAdd({
      data:params,
      ok:response=>{
        dispatch(types.COLLECT_ADD_SUCCESS,response.data);
        _.toast('收藏成功');
        callback();
      },
      wrong:response=>{
        dispatch(types.COLLECT_ADD_ERROR,response.data);
        _.toast(response.data.msg);
      }
  })
}

//取消收藏
export const collectRemove = ({ dispatch }, params,callback) => {
  Api.collectRemove({
      data:params,
      ok:response=>{
        dispatch(types.COLLECT_CANCEL_SUCCESS,response.data);
         _.toast('已移除');
         callback();
      },
      wrong:response=>{
        dispatch(types.COLLECT_CANCEL_ERROR,response.data);
        _.toast(response.data.msg);
      }
  })
}