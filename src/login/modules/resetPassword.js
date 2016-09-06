import {
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR
} from '../mutationTypes'

const state = {
  msg:''
}

const mutations = {
  [RESET_PASSWORD_SUCCESS](state , data){
    state.msg = data.msg;
  },
  [RESET_PASSWORD_ERROR](state, data){
     state.msg = data.msg;
  }
}

export default {
  state,
  mutations
}