import * as types from '../mutationTypes'

const state = {
    subjectId:'2',
    my:[],
    chapter:[],
    all:[]
}

const mutations = {
  [types.REMEMBER_WORKBOOK_GET](state, data) {
      state.my = data.data;
  },
  [types.REMEMBER_SUBJECT_CHANGE](state,id){
      state.subjectId = id;
      state.my = [];
  },
  [types.REMEMBER_CHAPTER_GET](state,data){
      state.chapter =  data.data;
  },
  [types.REMEMBER_CHAPTER_CLEAR](state,data){
      state.chapter =  [];
  }
}

export default {
  state,
  mutations
}
