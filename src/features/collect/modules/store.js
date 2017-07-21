import * as types from './mutationTypes'
import * as getters from './getters'
import * as actions from './actions'

const state = {
  math: {
    list: [],
    offset: '',
    scroll: 0,
    isReset: true
  },
  physics: {
    list: [],
    offset: '',
    scroll: 0,
    isReset: true
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
  [types.COLLECT_RELOAD] (state) {
    state.math = {list: [], offset: '', scroll: 0, isReset: true}
    state.physics = {list: [], offset: '', scroll: 0, isReset: true}
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
