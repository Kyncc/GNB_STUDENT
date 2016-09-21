import {
  GET_STUDENT_INDEX_SUCCESS,
  GET_STUDENT_INDEX_ERROR
} from '../mutationTypes'

const state = {
  code:'',
  collectCount:0,
  errorCount:0,
  cameraCount:0 ,
  swiper:[],
  msg:''
}

const mutations = {
  [GET_STUDENT_INDEX_SUCCESS](state , data){
    state.code = data.data.code;
    state.collectCount = data.data.collectCount;
    state.errorCount = data.data.errorCount;
    state.cameraCount = data.data.cameraCount;
    state.swiper = data.data.swiper;
    state.msg = data.msg;
  },
  [GET_STUDENT_INDEX_ERROR](state, data){
    state.msg = data.msg;
  }
}

export default {
  state,
  mutations
}