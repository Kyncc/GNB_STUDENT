import * as types from './mutationTypes'


export const getToastMsg = ({ dispatch }, msg) => {
    dispatch(types.GET_TOAST_MESSAGE,msg);
}

export const getToastShow = ({ dispatch }, status) => {
    dispatch(types.GET_TOAST_SHOW,status);
}

export const getIsLoading = ({ dispatch }, status)=> {
    dispatch(types.GET_LOADING,status);
}
