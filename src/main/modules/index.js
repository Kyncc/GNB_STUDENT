import {GET_STUDENT_INDEX_SUCCESS, GET_STUDENT_INDEX_ERROR,SET_HEAD_IMG,SET_HEAD_PHOTO} from '../mutationTypes'

const state = {
  code: '',
  collectCount: 0,
  errorCount: 0,
  cameraCount: 0,
  swiper: [],
  msg: '',
  headImg: '',
  headPhoto: ''
}

const mutations = {
  [GET_STUDENT_INDEX_SUCCESS](state, data) {
    state.code = data.data.code;
    state.collectCount = data.data.collectCount;
    state.errorCount = data.data.errorCount;
    state.cameraCount = data.data.cameraCount;
    state.swiper = data.data.swiper;
    state.msg = data.msg;
  },
  [GET_STUDENT_INDEX_ERROR](state, data) {
    state.msg = data.msg;
  },
  [SET_HEAD_IMG](state, data) {
    state.headImg = data;
  },
  [SET_HEAD_PHOTO](state, data) {
    state.headPhoto = data;
  }
}

export default {
  state,
  mutations
}
