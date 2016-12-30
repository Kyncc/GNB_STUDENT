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
        setTimeout(()=>{
          history.back();
        },1000);
         _.toast("点评成功");
      },
      wrong:response=>{
        _.toast(response.data.msg);
      }
  })
}

//纠错
export const correct = ({ dispatch }, params) => {
  Api.correct({
      data:params,
      ok:response=>{
        _.toast("纠错成功");
        setTimeout(()=>{
          history.back();
        },1000);
      },
      wrong:response=>{
        _.toast(response.data.msg);
      }
  })
}