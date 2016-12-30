import * as types from './mutationTypes'

const state = {    
    all:[],
    my:[],
    subjectId:'2' 
}

const mutations = {
  [types.WORKBOOK_ADD](state, data) {
    state.all = [];
    state.my = [];
  },
  [types.WORKBOOK_GET](state, data) {
     state.my = data;
  },
  [types.WORKBOOK_RELOAD](state) {
     state.my = [];
     state.all = [];
  },
  [types.WORKBOOK_GET_ALL](state, data) {
     state.all = data;
  },
  [types.WORKBOOK_SUBJECT_CHANGE](state, id) {
     state.subjectId = id;
     state.my = [];
     state.all = [];
  }
}

export default {
  state,
  mutations
}
