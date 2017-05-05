import * as types from './mutationTypes'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'

const mutations = {
  [types.MYBOOK] (state, payload) {
    state['myBook'][payload.subject]['list'] = payload.data
  },
  [types.MYBOOK_CLEAR] (state, payload) {
    state['myBook'][payload.subject]['list'] = []
    state['myBook'][payload.subject]['scroll'] = 0
  },
  [types.MYBOOK_SCROLL] (state, payload) {
    state['myBook'][payload.subject].scroll = payload.height
  },
  [types.MYBOOK_LIST] (state, payload) {
    state.myBook.add = payload.data.textbook
  },
  [types.MYBOOK_LIST_CLEAR] (state) {
    state.myBook.add = []
  },
  [types.MYBOOK_SEARCH] (state, payload) {
    state.myBook.search = payload.data.textbook
  },
  [types.MYBOOK_SEARCH_CLEAR] (state) {
    state.myBook.search = []
  },
  [types.MYBOOK_ADD] (state, payload) {
    state['myBook'][payload.type][payload.pindex]['list'][payload.index].status = true
  },
  [types.MYBOOK_DEL] (state, payload) {
    state['myBook'][payload.type][payload.pindex]['list'][payload.index].status = false
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
