import * as types from './mutationTypes'
import * as getters from './getters'
import * as actions from './actions'

const state = {
  math: {
    list: [],
    isReset: true,
    offset: '',
    scroll: 0
  },
  physics: {
    list: [],
    isReset: true,
    offset: '',
    scroll: 0
  }
}

const mutations = {
  [types.COLLECT_LIST] (state, payload) {
    if (payload.list.length === 0) return
    state.math.isReset = false
    // state.math.offset = payload.data.offset
    state.math.offset = payload.offset
    // state.math.list = state.math.list.concat(payload.data.list)

    state.math.list = state.math.list.concat(payload.list)
    // state[payload.subject]['isReset'] = false
    // state[payload.subject]['offset'] = payload.data.offset
    // state[payload.subject]['list'] = state[payload.subject]['list'].concat(payload.data.list)
  },
  [types.COLLECT_SCROLL] (state, payload) {
    state.math.scroll = payload.height
    // state[payload.subject]['scroll'] = payload.height
  },
  [types.COLLECT_RELOAD] (state, payload) {
    // state[payload.subject]['list'] = []
    // state[payload.subject]['isReset'] = true
    // state[payload.subject]['offset'] = ''
    // state[payload.subject]['list'] = 0
    state.math.list = []
    state.math.isReset = true
    state.math.offset = ''
    state.math.list = 0
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
