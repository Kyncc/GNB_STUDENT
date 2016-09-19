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

//纠错

//收藏

//取消收藏