import {
  COLLECT_ADD_SUCCESS,
  COLLECT_ADD_ERROR,
  COLLECT_CANCEL_SUCCESS,
  COLLECT_CANCEL_ERROR
} from '../mutationTypes'


const state = {
  code:'',
  msg:''
}

const mutations = {
  [COLLECT_ADD_SUCCESS](state , data){
    state.code = data.code;
    state.msg = data.msg;
  },
  [COLLECT_ADD_ERROR](state, data){
    state.msg = data.msg;
  },
  [COLLECT_CANCEL_SUCCESS](state , data){
    state.code = data.code;
    state.msg = data.msg;
  },
  [COLLECT_CANCEL_ERROR](state, data){
    state.msg = data.msg;
  }
}

export default {
  state,
  mutations
}