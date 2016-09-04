import {
  GET_TOAST_MESSAGE,
  GET_TOAST_SHOW,
  GET_LOADING
} from './mutationTypes'

const state = {
    toastMsg:'1111',
    toastShow:true,
    isLoading:false
}

const mutations = {
    GET_TOAST_MESSAGE (state, msg) {
      state.toastMsg = msg
    },
    GET_TOAST_SHOW (state, status) {
      state.toastShow = status
    },
    GET_LOADING (state, status) {
      state.isLoading = status
    }
}

export default {
  state,
  mutations
}