import {
  SET_PASSWORD_SUCCESS,
  SET_PASSWORD_ERROR
} from '../mutationTypes'

const state = {
  msg:''
}

const mutations = {
  [SET_PASSWORD_SUCCESS](state , data){
    state.msg = data.msg;
  },
  [SET_PASSWORD_ERROR](state, data){
     state.msg = data.msg;
  }
}

export default {
  state,
  mutations
}