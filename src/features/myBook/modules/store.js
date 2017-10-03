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
  },
  [types.MYBOOK_WANT_ADD] (state, payload) {
    if (payload.type === 'index') {
      state.myBook.want.index = payload.data
    } else {
      state.myBook.want.version = payload.data
    }
  },
  [types.MYBOOK_WANT_DEL] (state, type) {
    if (type === 'index') {
      state.myBook.want.index = ''
    } else {
      state.myBook.want.version = ''
    }
  },
  [types.MYBOOK_WANT_CAMERA] (state, data) {
    state.myBook.want.camera = data
  },
  [types.MYBOOK_WANT_UPLOAD] (state) {
    state.myBook.want.index = ''
    state.myBook.want.version = ''
    state.myBook.want.camera = ''
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
