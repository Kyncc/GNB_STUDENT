import * as types from './mutationTypes'
import * as actions from './actions'
import * as getters from './getters'

const state = {
  hasNewClassMsg:'',
  hasNewCorretMsg:'',
  hasNewSystemMsg:''
}

const mutations = {
  [types.INTERACT](state , data){
    state.hasNewClassMsg = data.hasNewClassMsg;
    state.hasNewCorretMsg = data.hasNewCorretMsg;
    state.hasNewSystemMsg = data.hasNewSystemMsg;
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}