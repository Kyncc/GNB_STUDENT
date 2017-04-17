import * as types from './mutationTypes'
import * as actions from './actions'
import * as getters from './getters'

const state = {
  register: {
    mobile: '',
    code: '',
    isStudent: '',
    version: {
      math: [],
      physics: []
    }
  },
  forget: {
    code: '',
    mobile: ''
  },
  token: '0bc59fa42ce6683a1617e2e05ceb1997'
  // token: localStorage.getItem('token')
}

const mutations = {
  [types.REGISTER_MESSAGE] (state, data) {
    state.register.mobile = data.data.mobile
    state.register.code = data.data.code
    state.register.isStudent = data.data.isStudent
  },
  [types.FORGET_MESSAGE] (state, data) {
    state.forget.code = data.data.code
    state.forget.mobile = data.data.mobile
  },
  [types.LOGIN] (state, data) {
    state.token = data.token
    localStorage.setItem('token', data.token)
  },
  [types.SET_PASSWORD] (state, data) {
    state.token = data.token
    localStorage.setItem('token', data.token)
  },
  [types.TEXTBOOK_VERSION_ALL] (state, data) {
    state.register.version.math = data.subjectOptions.math
    if (data.subjectOptions.physics) {
      state.register.version.physics = data.subjectOptions.physics
    } else {
      state.register.version.physics = []
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
