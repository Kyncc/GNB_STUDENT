import * as types from './mutationTypes'
import * as actions from './actions'

const state = {
  system: (/iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) ? 'IOS' : 'Android'),
  user: {
    headImg: '',
    name: '',
    school: '',
    sex: '',
    mobile: '',
    grade: '',
    subjectType: [],
    textbook: [],
    subject: [],
    version: '',
    swiper: [{}],
    token: 'a2015acf8d8fcb01ef08ced2e0ffd583'
  }
}

const getters = {
  Path: (state, getters, rootState) => {
    return rootState.route.path
  },
  Query: (state, getters, rootState) => {
    return rootState.route.query
  },
  Params: (state, getters, rootState) => {
    return rootState.route.params
  },
  Route: (state, getters, rootState) => {
    return rootState.route
  },
  User: (state) => {
    return state.user
  },
  System: (state) => {
    return state.system
  }
}

const mutations = {
  [types.USERINFO] (state, data) {
    state.user.textbook = data.data.textbook[0]
    state.user.headImg = data.data.headImg
    state.user.name = data.data.name
    state.user.mobile = data.data.mobile
    state.user.school = data.data.school
    state.user.sex = data.data.sex
    state.user.grade = data.data.grade
    state.user.version = data.data.version
    state.user.subject = data.data.subject
    state.user.subjectType = data.data.subjectType
    state.user.swiper = data.data.swiper
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
