import {
  GET_TOAST_MESSAGE,
  GET_TOAST_SHOW,
  GET_LOADING
} from './mutationTypes'

const state = {
    toastMsg:'',
    toastShow:false,
    isLoading:false,
    period_id:2,
    subject_id:3
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