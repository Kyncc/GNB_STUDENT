import * as types from './mutationTypes'
import * as getters from './getters'
import * as actions from './actions'

const state = {
  all:[],
  my:[],
  subjectId:'2',
  isReset:false 
}

const mutations = {
  [types.TEXTBOOK_GET](state, data) {
     state.my = data;
  },
  [types.TEXTBOOK_ALL](state, data) {
     state.all = data;
  },
  [types.TEXTBOOK_SUBJECT_CHANGE](state, id) {
     state.subjectId = id;
     state.my = [];
     state.all = [];
     state.isReset = true;
  },
  [types.TEXTBOOK_RELOAD](state) {
     state.my = [];
     state.all = [];
     state.isReset = true;
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}