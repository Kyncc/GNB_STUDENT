import {
  CORRECT_SUCCESS,
  CORRECT_ERROR
} from '../mutationTypes'


const state = {
  code:'',
  msg:''
}

const mutations = {
  [CORRECT_SUCCESS](state , data){
    state.code = data.code;
    state.msg = data.msg;
  },
  [CORRECT_ERROR](state, data){
    state.msg = data.msg;
  }
}
export default {
  state,
  mutations
}