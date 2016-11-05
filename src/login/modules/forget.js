import {
  GET_FORGET_MESSAGE_SUCCESS
} from '../mutationTypes'

const state = {
  code:'',
  mobile:''
}

const mutations = {
  [GET_FORGET_MESSAGE_SUCCESS](state , data){
    state.code = data.data.code;
    state.mobile = data.data.mobile;
  }
}

export default {
  state,
  mutations
}