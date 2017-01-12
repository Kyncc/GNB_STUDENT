import * as types from './mutationTypes'

const state = {
  my:[],
  classmate:{},
  searchClass:[]
}



const mutations = {
  [types.CLASS_MY_GET](state,data) {
     state.my = data;
  },
  [types.CLASS_MYCLASSMATE_GET](state,data) {
     state.classmate = data[0];
  },
  [types.CLASS_SEARCH](state,data) {
     state.searchClass = data;
  },
  [types.CLASS_ADD](state) {
     state.my = [];
  }
}

export default {
  state,
  mutations
}
