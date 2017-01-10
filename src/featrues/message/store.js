import * as types from './mutationTypes'

const state = {
  system:{},
  class:{},
  correct:{}
}

const mutations = {
  [types.MESSAGE_SYSTEM](state , data){
    state.system = data.data;
  },
  [types.MESSAGE_CORRECT](state , data){
    state.correct = data.data;
  },
  [types.MESSAGE_CLASS](state , data){
    state.class = data.data;
  }
}

export default {
  state,
  mutations
}