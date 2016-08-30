import {
  GET_MESSAGE_SUCCESS,
  GET_MESSAGE_ERROR
} from '../mutationTypes'

const state = {
  messageCode:'',
  registerMobilde:''
}

const mutations = {
  [GET_MESSAGE_SUCCESS](state , data){
    state.messageCode = data.data.code;
    state.registerMobilde = data.data.mobile;
  },
  [GET_MESSAGE_ERROR](state, err){
    console.log(err)
  }
}

export default {
  state,
  mutations
}