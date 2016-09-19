import {
  GET_COLLECT_CAMERALELIST_SUCCESS,
  GET_COLLECT_CAMERALELIST_ERROR
} from '../mutationTypes'

const state = {
  code:'',
  list:'',
  msg:''
}

const mutations = {
  [GET_COLLECT_CAMERALELIST_SUCCESS](state , data){
    state.code = data.data.code;
    state.list = data.data.ids;
    state.msg = data.msg;
  },
  [GET_COLLECT_CAMERALELIST_ERROR](state, data){
    state.msg = data.msg;
  }
}

export default {
  state,
  mutations
}