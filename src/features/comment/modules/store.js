import * as types from './mutationTypes'
import * as getters from './getters'
import * as actions from './actions'

const state = {
  comment: {}
}

const mutations = {
  [types.COMMENT] (state, payload) {
    state.comment = payload.data
  },
  [types.COMMENT_RELOAD] (state) {
    state.comment = []
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
