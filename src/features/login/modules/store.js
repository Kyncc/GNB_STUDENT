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
  [types.SET_PASSWORD] (state, data) {
    state.token = data.token
    localStorage.setItem('token', data.token)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
