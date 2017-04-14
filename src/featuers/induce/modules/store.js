import * as types from './mutationTypes'
import * as getters from './getters'
import * as actions from './actions'

const state = {
  math: {
    index: {
      list: [],
      scroll: 0,
      isReset: false
    },
    list: {}
  },
  physics: {
    index: {
      list: [],
      scroll: 0,
      isReset: false
    },
    list: {}
  }
}

const mutations = {
  [types.INDUCE] (state, payload) {
    state[payload.subject].list = payload.data
    state[payload.subject].isReset = false
  },
  [types.INDUCE_CLEAR] (state, payload) {
    state[payload.subject].list = []
    state[payload.subject].scroll = 0
    state[payload.subject].isReset = true
  },
  [types.INDUCE_SCOLLER] (state, payload) {
    state[payload.subject].scroll = payload.height
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
