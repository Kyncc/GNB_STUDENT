import * as types from './mutationTypes'
import * as getters from './getters'
import * as actions from './actions'

const state = {
  class: [],
  system: [],
  correct: []
}

const mutations = {
  [types.MESSAGE_CLASS] (state, data) {
    state.class = data
  },
  [types.MESSAGE_SYSTEM] (state, data) {
    state.system = data
  },
  [types.MESSAGE_CORRECT] (state, data) {
    state.correct = data
  },
  [types.MESSAGE_CLEAR] (state) {
    state.class = []
    state.system = []
    state.correct = []
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
