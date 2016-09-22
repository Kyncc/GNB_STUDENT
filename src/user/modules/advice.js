import {
  GET_ADVICE_LIST
} from '../mutationTypes'

const state = {
    adviceList: []
}

const mutations = {
  [GET_ADVICE_LIST](state, data) {
    state.adviceList = data
  }
}

export default {
  state,
  mutations
}
