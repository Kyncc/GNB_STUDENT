import * as types from './mutationTypes'
import * as getters from './getters'
import * as actions from './actions'

const state = {
    all:{
      list:[],
      isReset:false
    },
    my:{
      list:[],
      isReset:false
    },
    subjectId:'2'
}

const mutations = {
  [types.WORKBOOK_GET](state, data){
     state.my.list = data;
     state.my.isReset = false;
  },
  [types.WORKBOOK_RELOAD](state) {
     state.my.list = [];
     state.all.list = [];
     state.my.isReset = true;
     state.all.isReset = true;
  },
  [types.WORKBOOK_ALL_CLEAR](state) {
     state.all.list = [];
     state.all.isReset = true;
  },
  [types.WORKBOOK_ALL](state, data) {
     state.all.list = data;
     state.all.isReset = false;
  },
  [types.WORKBOOK_SUBJECT_CHANGE](state, id) {
     state.subjectId = id;
     state.my.list = [];
     state.all.list = [];
     state.my.isReset = true;
     state.all.isReset = true;
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
