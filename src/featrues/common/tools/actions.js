import * as types from './mutationTypes'

export const getToastMsg = ({ commit }, msg) => {
    commit(types.TOAST_MESSAGE,msg);
}

export const getToastShow = ({ commit }, status) => {
    commit(types.TOAST_SHOW,status);
}

export const getIsLoading = ({ commit }, status)=> {
    commit(types.LOADING,status);
}

