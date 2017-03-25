const state = {
  toastMsg:'',
  toastShow:false,
  isLoading:false,
  system:(/iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) ? 'IOS' : 'Android')
}

const actions = {
  toastMsg : ({ commit }, msg) => {
    commit('TOAST_MESSAGE',msg);
  },
  toastShow : ({ commit }, status) => {
    commit('TOAST_SHOW',status);
  },
  isLoading :({ commit }, status)=> {
    commit('LOADING',status);
  }
} 

const getters = {
  path:(state,getters,rootState) => {
    return rootState.route.path
  },
  Query:(state,getters,rootState) => {
    return rootState.route.query
  },
  Name:(state,getters,rootState) => {
    return rootState.route.name
  },
  ClassCode:(state,getters,rootState) => {
    return rootState.route.params.code
  },
  Params:(state,getters,rootState) => {
    return rootState.route.params
  },
  User:(state,getters,rootState) => {
    return rootState.user
  },
  System:(state,getters,rootState) => {
    return rootState.tools.system
  }
}

const mutations = {
  'TOAST_MESSAGE'(state, msg) {
    state.toastMsg = msg
  },
  'TOAST_SHOW'(state, status) {
    state.toastShow = status
  },
  'LOADING'(state, status) {
    state.isLoading = status
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}