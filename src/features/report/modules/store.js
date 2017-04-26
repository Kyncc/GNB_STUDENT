import * as types from './mutationTypes'
import * as actions from './actions'
import * as getters from './getters'

const state = {
  index: {
    math: {
      chapter: [],
      scroll: 0
    },
    physics: {
      chapter: [],
      scroll: 0
    }
  },
  detail: []
}

const mutations = {
  [types.REPORT] (state, payload) {
    state['index'][payload.subject]['chapter'] = payload.data
  },
  [types.REPORT_SCROLL] (state, payload) {
    state['index'][payload.subject]['scroll'] = payload.height
  },
  [types.REPORT_DETAIL] (state, data) {
    state.detail = data
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
