import {
  COMMENT_SUCCESS,
  COMMENT_ERROR
} from '../mutationTypes'


const state = {
  code:'',
  msg:''
}

const mutations = {
  [COMMENT_SUCCESS](state , data){
    state.code = data.code;
    state.msg = data.msg;
  },
  [COMMENT_ERROR](state, data){
    state.msg = data.msg;
  }
}

export default {
  state,
  mutations
}