import * as types from './mutationTypes'
import * as getters from './getters'
import * as actions from './actions'

const state = {
  subjectId: 2,
  scroll: 0,
  list: []
}

const mutations = {
  [types.HOMEWORK] (state, payload) {
    state.subjectId = payload.subjectId
    state.list = payload.data
  },
  [types.HOMEWORK_RESET] (state, data) {
    state.subjectId = 2
    state.scroll = 0
    state.list = []
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
