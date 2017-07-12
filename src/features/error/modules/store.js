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
    isReset: true,
    list: [],
    offset: '',
    scroll: 0
  },
  detail: {
    scroll: 0,
    list: []
  }
}

const mutations = {
  [types.ERROR] (state, payload) {
    if (payload.data.list.length === 0) return
    state[payload.subject]['isReset'] = false
    state[payload.subject]['offset'] = payload.data.offset
    if (state[payload.subject]['list']) {
      state[payload.subject]['list'] = state[payload.subject]['list'].concat(payload.data.list)
    } else {
      state[payload.subject]['list'] = payload.data.list
    }
  },
  [types.ERROR_ERROR_TYPE] (state, payload) {
    state[payload.subject]['list'][payload.index]['errorType'] = Number(payload.type)
  },
  [types.ERROR_SCROLL] (state, payload) {
    state[payload.subject]['scroll'] = payload.height
  },
  [types.ERROR_RELOAD] (state, payload) {
    state[payload.subject]['isReset'] = true
    state[payload.subject]['list'] = []
    state[payload.subject]['offset'] = ''
    state[payload.subject]['scroll'] = 0
  },
  [types.ERROR_DETAIL] (state, payload) {
    state['detail']['list'] = state['detail']['list'].concat(payload.data)
  },
  [types.ERROR_DETAIL_SCROLL] (state, payload) {
    state.detail.scroll = payload.height
  },
  [types.ERROR_DETAIL_CORRELATION] (state, payload) {
    state['detail']['list'][payload.index].correlation = payload.data
  },
  [types.ERROR_DETAIL_RELOAD] (state) {
    state.detail.scroll = 0
    state.detail.list = []
  },
  [types.ERROR_EXAMPLE_ERROR] (state, payload) {
    state['detail']['list'][payload.index].exampleError = !state['detail']['list'][payload.index].exampleError
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
