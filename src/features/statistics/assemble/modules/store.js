import * as types from './mutationTypes'
import * as getters from './getters'
import * as actions from './actions'

const state = {
  index: {
    math: [{}],
    physics: [{}],
    chemistry: [{}]
  }
}

const mutations = {
  [types.STATISTICS] (state, payload) {
    state['index'][payload.subject] = payload.data
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
