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
    state['index'][payload.subject.toString()] = payload.data
  },
  [types.STATISTICS_RESET] (state, payload) {
    state['index'][payload.subject.toString()] = []
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
