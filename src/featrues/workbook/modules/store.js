import * as types from './mutationTypes'
import * as getters from './getters'
import * as actions from './actions'

const state = {
    all:[],
    my:[],
    subjectId:'2' 
}

const mutations = {
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
  mutations,
  getters,
  actions
}
