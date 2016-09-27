import {
  COLLECT_ADD_SUCCESS,
  COLLECT_ADD_ERROR,
  COLLECT_CANCEL_SUCCESS,
  COLLECT_CANCEL_ERROR
} from '../mutationTypes'


const state = {
  add:{
     code:'',
     msg:''
  },
  remove:{
    code:'',
    msg:''
  }
}

const mutations = {
  [COLLECT_ADD_SUCCESS](state , data){
    state.add.code = data.code;
    state.add.msg = data.msg;
  },
  [COLLECT_ADD_ERROR](state, data){
    state.add.msg = data.msg;
  },
  [COLLECT_CANCEL_SUCCESS](state , data){
    state.remove.code = data.code;
    state.remove.msg = data.msg;
  },
  [COLLECT_CANCEL_ERROR](state, data){
    state.remove.msg = data.msg;
  }
}

export default {
  state,
  mutations
}