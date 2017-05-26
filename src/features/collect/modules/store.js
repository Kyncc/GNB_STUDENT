import * as types from './mutationTypes'
import * as getters from './getters'
import * as actions from './actions'

const state = {
  math: {
    list: [],
    offset: '',
    scroll: 0
  },
  physics: {
    list: [],
    offset: '',
    scroll: 0
  }
}

const mutations = {
  [types.COLLECT_LIST] (state, payload) {
    if (payload.data.list.length === 0) return
    state[payload.subject]['isReset'] = false
    state[payload.subject]['offset'] = payload.data.offset
    if (state[payload.subject]['list']) {
      state[payload.subject]['list'] = state[payload.subject]['list'].concat(payload.data.list)
    } else {
      state[payload.subject]['list'] = payload.data.list
    }
  },
  [types.COLLECT_SCROLL] (state, payload) {
    state[payload.subject]['scroll'] = payload.height
  },
  [types.COLLECT_RELOAD] (state, payload) {
    state[payload.subject]['list'] = []
    state[payload.subject]['offset'] = ''
    state[payload.subject]['scroll'] = 0
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
