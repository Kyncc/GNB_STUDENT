import * as types from './mutationTypes'
import * as getters from './getters'
import * as actions from './actions'
import state from './state'

const mutations = {
  [types.INDUCE] (state, payload) {
    state['index'][payload.subject]['list'] = payload.data
    state['index'][payload.subject]['isReset'] = false
  },
  [types.INDUCE_CLEAR] (state, payload) {
    state['index'][payload.subject]['list'] = []
    state['index'][payload.subject]['scroll'] = 0
    state['index'][payload.subject]['isReset'] = true
  },
  [types.INDUCE_SCOLLER] (state, payload) {
    state['index'][payload.subject]['scroll'] = payload.height
  },
  [types.INDUCE_LIST] (state, payload) {
    state['exercise'][payload.type]['list'] = state['exercise'][payload.type]['list'].concat(payload.data.list)
    state['exercise'][payload.type]['offset'] = payload.data.offset
    state['exercise'][payload.type]['totalCount'] = payload.data.totalCount
    state['exercise'][payload.type]['recordSize'] = payload.data.recordSize
  },
  [types.INDUCE_LIST_CLEAR] (state, payload) {
    state['exercise'][payload.type]['list'] = []
    state['exercise'][payload.type]['scroll'] = 0
    state['exercise'][payload.type]['totalCount'] = 0
    state['exercise'][payload.type]['recordSize'] = 0
    state['exercise'][payload.type]['offset'] = ''
  },
  [types.INDUCE_LIST_SCOLLER] (state, payload) {
    state['exercise'][payload.type]['scroll'] = payload.height
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
