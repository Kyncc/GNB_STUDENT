import * as types from '../mutationTypes'

const state = {
  token: localStorage.getItem('token')
}

const mutations = {
  [types.LOGIN](state, data){
    state.token = data.token;
    localStorage.setItem('token',data.token);
  },
  [types.SET_PASSWORD](state, data){
    state.token = data.token;
    localStorage.setItem('token',data.token);
  },
  [types.SET_HEAD_IMG](state, data) {
    state.headImg = data;
    localStorage.setItem('headImg',data);
  }
}

export default {
  state,
  mutations
}
