import * as types from '../mutationTypes'

const state = {
    subjectId:'2',
    my:[],
    all:[]
}

const mutations = {
  [types.REMEMBER_WORKBOOK_GET](state, data) {
      state.my = data.data;
  },
  [types.REMEMBER_SUBJECT_CHANGE](state,id){
      state.subjectId = id;
      state.my = [];
  }
}

export default {
  state,
  mutations
}
