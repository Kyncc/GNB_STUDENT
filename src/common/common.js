import {
  GET_TOAST_MESSAGE,
  GET_TOAST_SHOW,
} from './mutationTypes'

const state = {
  toastMsg:'',
  toastShow:false
}

const mutations = {
    GET_TOAST_MESSAGE (state, msg) {
      state.toastMsg = msg
    },
    GET_TOAST_SHOW (state, status) {
      state.toastShow = status
    }
}

export default {
  state,
  mutations
}