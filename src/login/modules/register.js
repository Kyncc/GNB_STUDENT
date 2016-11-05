import {
  GET_REGISTER_MESSAGE_SUCCESS,
  GET_TEXTBOOK_VERSION_SUCCESS
} from '../mutationTypes'

const state = {
  mobile:'',
  code:'',
  version:{
    math:[{}],
    physics:[{}]
  }
}

const mutations = {
  [GET_REGISTER_MESSAGE_SUCCESS](state , data){
    state.mobile = data.data.mobile;
    state.code = data.data.code;
  },
  [GET_TEXTBOOK_VERSION_SUCCESS](state , data){
    state.version.math = data.data.math;
    state.version.physics = data.data.physics;
  }
}

export default {
  state,
  mutations
}