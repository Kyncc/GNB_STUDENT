import * as types from './mutationTypes'

const state = {
  list:[],
  version:''
}

const mutations = {
  [types.GET_ADVICE_LIST](state, data) {
    state.list = data;
  },
  //APP版本
  [types.GET_VERSION](state, data) {
    state.version = data
  }
}

export default {
  state,
  mutations
}
