import * as actions from './actions'
import * as types from './mutationTypes'

const state = {
  example: []
}

const getters = {
  Example: (state) => {
    return state.example
  }
}

const mutations = {
  [types.EXAMPLE] (state, data) {
    state.example = data
  },
  [types.EXAMPLE_CLEAR] (state, data) {
    state.example = []
  },
  [types.COLLECT_ADD] (state) {
    state.example.detail[0].collectTime = 1
  },
  [types.COLLECT_REMOVE] (state) {
    state.example.detail[0].collectTime = 0
  }
}

export default {
  mutations, getters, actions, state
}
