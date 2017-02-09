import * as types from './mutationTypes'

const state = {
  example:{
    ids:[],
    list:[],
    current:1,
    totalPage:1,
    isReset:true
  },
  scoll:0,
  subjectId:'2'
}

const mutations = {
  [types.COLLECT_EXAMPLEIDS](state , data){
    state.example.isReset = false;
    state.example.ids = data.data.ids;
    state.example.totalPage = data.data.totalPage;
  },
  [types.COLLECT_EXAMPLELIST](state , data){
    if(data.data.length == 0){return;}
    state.example.current++;
    state.example.list = state.example.list.concat(data.data);
  },
  [types.COLLECT_INDEX_SCOLL](state,height){
    state.scoll = height;
  },
  [types.COLLECT_SUBJECT_CHANGE](state, id){
    state.subjectId = id;
  },
  [types.COLLECT_RELOAD](state){
    state.scoll = 0;
    state.example.ids = [];
    state.example.list = [];
    state.example.totalPage = 1;
    state.example.current = 1;
    state.example.isReset = true;
  }
}

export default {
  state,
  mutations
}
