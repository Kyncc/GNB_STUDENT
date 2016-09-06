import {
  GET_REGISTER_MESSAGE_SUCCESS,
  GET_REGISTER_MESSAGE_ERROR
} from '../mutationTypes'

const state = {
  code:'',
  mobile:'',
  msg:''
}

const mutations = {
  [GET_REGISTER_MESSAGE_SUCCESS](state , data){
    state.code = data.data.code;
    state.mobile = data.data.mobile;
    state.msg = data.msg;
  },
  [GET_REGISTER_MESSAGE_ERROR](state, data){
    state.msg = data.msg;
  }
}

export default {
  state,
  mutations
}