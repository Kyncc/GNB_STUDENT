import * as types from './mutationTypes'

const state = {    
    all:[],
    my:[],
    subjectId:'2' 
}

const mutations = {
  [types.WORKBOOK_ADD](state, data) {
    state.workbook.all = [];
    state.workbook.my = [];
  },
  [types.WORKBOOK_GET](state, data) {
     state.workbook.my = data;
  },
  [types.WORKBOOK_RELOAD](state) {
     state.workbook.my = [];
     state.workbook.all = [];
  },
  [types.WORKBOOK_GET_ALL](state, data) {
     state.workbook.all = data;
  },
  [types.WORKBOOK_SUBJECT_CHANGE](state, id) {
     state.workbook.subjectId = id;
     state.workbook.my = [];
     state.workbook.all = [];
  }
}

export default {
  state,
  mutations
}
