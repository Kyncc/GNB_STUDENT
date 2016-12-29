import {SET_HEAD_IMG,SET_HEAD_PHOTO} from '../mutationTypes'

const state = {
  headPhoto: ''     //本地base64
}

const mutations = {
  [SET_HEAD_PHOTO](state, data) {
    state.headPhoto = data;
  }
}

export default {
  state,
  mutations
}
