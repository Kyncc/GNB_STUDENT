import {
  GET_TOAST_MESSAGE,
  GET_TOAST_SHOW,
  GET_LOADING,
  SET_SYSTEM
} from './mutationTypes'

const state = {
    toastMsg:'',
    toastShow:false,
    isLoading:false,
    system:''
}

    // var ua = navigator.userAgent.toLowerCase();	
    // if (/iphone|ipad|ipod/.test(ua)) {
    //       alert("iphone");		
    // } else if (/android/.test(ua)) {
    //       alert("android");	
    // }
  
const mutations = {
    GET_TOAST_MESSAGE (state, msg) {
      state.toastMsg = msg
    },
    GET_TOAST_SHOW (state, status) {
      state.toastShow = status
    },
    GET_LOADING (state, status) {
      state.isLoading = status
    },
    SET_SYSTEM (state, type) {
      state.system = type
    }
}

export default {
  state,
  mutations
}