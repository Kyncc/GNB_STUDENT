import * as actions from './actions'
import * as types from './mutationTypes'

const state = {
  example:[]
}

const getters = {
  Example: (state,getters) => {
     return state.example;
  }
}

const mutations = {
  [types.EXAMPLE](state, data) {
    state.example = data;
  },
  [types.EXAMPLE_CLEAR](state, data) {
    state.example = [];
  }
}

export default {
  mutations,
  getters,
  actions,
  state
}