import * as types from './mutationTypes'
import * as getters from './getters'
import * as actions from './actions'

const state = {
  adviceList: []
}

const mutations = {
  [types.ADVICE_LIST] (state, data) {
    state.adviceList = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
