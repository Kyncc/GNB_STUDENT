import {
  GET_CLASS_LIST
} from '../mutationTypes'

const state = {
  classList: []
}

const mutations = {
  [GET_CLASS_LIST](state, data) {
    state.classList = data
  }
}

export default {
  state,
  mutations
}
