import * as types from './mutationTypes'
import * as getters from './getters'
import * as actions from './actions'

const state = {
  paper: {
    list: [],
    search: [],
    offset: ''
  },
  camera: {
    list: [],
    detail: [],
    scroll: 0
  },
  good: {
    list: [],
    detail: [],
    scroll: 0
  },
  remember: {
    list: [],
    detail: [],
    scroll: 0
  }
}

const mutations = {
  [types.DOWNLOAD] (state, payload) {
    state[payload.type]['list'] = payload.data
  },
  [types.DOWNLOAD_SEARCH_PAPER] (state, payload) {
    state.paper.search = payload.data
    state.paper.offset = payload.data.offset
  },
  [types.DOWNLOAD_RESET] (state, payload) {
    state[payload.type]['list'] = []
  },
  [types.DOWNLOAD_DETAIL] (state, payload) {
    state[payload.type]['detail'] = payload.data
  },
  [types.DOWNLOAD_DETAIL_SCROLL] (state, payload) {
    state[payload.type]['scroll'] = payload.scroll
  },
  [types.DOWNLOAD_DETAIL_RESET] (state, payload) {
    state[payload.type]['detail'] = []
    state[payload.type]['scroll'] = 0
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
