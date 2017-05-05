import * as types from './mutationTypes'
import * as getters from './getters'
import * as actions from './actions'

const state = {
  my: [],
  classmate: {},
  searchClass: []
}

const mutations = {
  [types.CLASS_MY] (state, data) {
    state.my = data
  },
  [types.CLASS_MY_CLEAR] (state, data) {
    state.my = []
  },
  [types.CLASS_MYCLASSMATE] (state, data) {
    state.classmate = data[0]
  },
  [types.CLASS_MYCLASSMATE_CLEAR] (state, data) {
    state.classmate = []
  },
  [types.CLASS_SEARCH] (state, data) {
    state.searchClass = data
  },
  [types.CLASS_SEARCH_CLEAR] (state) {
    state.searchClass = []
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
