import * as types from './mutationTypes'
import * as actions from './actions'
import * as getters from './getters'

const state = {
   chapter:[],
   detail:[],
   scoll:0,
   isReset:false,
   subjectId:'2'
}

const mutations = {
  [types.REPORT_CHAPTER](state, data) {
    state.isReset = false;
    state.chapter = data;
  },
  [types.REPORT_CHANGE_SUBJECT](state,id){
    state.subjectId = id;
  },
  [types.CLEAR_REPORT_CHAPTER](state){
    state.chapter = [];
    state.isReset = true;
  },
  [types.REPORT_SCOLLER_HEIGHT](state,height){
    state.scoll = height;
  },
  [types.REPORT_DETAIL](state, data) {
    state.detail = data;
  },
  [types.REPORT_DETAIL_CLEAR](state, data) {
    state.detail = [];
  },
  [types.CHAPTER_STATE_CHANGE](state,index){
    state.chapter[index].checked = !state.chapter[index].checked
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
