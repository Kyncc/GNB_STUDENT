import * as types from '../mutationTypes'


const state = {
     chapter:[],
     detail:[],
     subjectId:'2',
     scoll:0
}

const mutations = {
  [types.GET_REPORT_CHAPTER](state, data) {
      state.chapter = data.data;
  },
  [types.REPORT_CHANGE_SUBJECT](state,id){
      state.subjectId = id;
  },
  [types.CLEAR_REPORT_CHAPTER](state){
      state.chapter = [];
  },
  [types.REPORT_SCOLLER_HEIGHT](state,height){
      state.scoll = height;
  },
  [types.GET_REPORT_DETAIL](state, data) {
      state.detail = data.data;
  },
   [types.CLEAR_REPORT_DETAIL](state, data) {
      state.detail = [];
  },
  [types.CHAPTER_STATE_CHANGE](state,index){
      state.chapter[index].checked = !state.chapter[index].checked
  }
}

export default {
  state,
  mutations
}
