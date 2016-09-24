import {
  GET_VERSION
} from '../mutationTypes'

const state = {
  version: {}
}

const mutations = {
  [GET_VERSION](state, data) {
    state.version = data
  }
}

export default {
  state,
  mutations
}
