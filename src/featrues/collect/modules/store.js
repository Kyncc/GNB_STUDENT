import * as types from './mutationTypes'
import * as getters from './getters'
import * as actions from './actions'

const state = {
  example:{
    list:[],
    isReset:true,
    offset:''
  },
  scroll:0,
  subjectId:'2'
}

const mutations = {
  [types.COLLECT_LIST](state , data){
    if(data.length == 0){return;}
    state.example.isReset = false;
    state.example.offset = data.offset;
    state.example.list = state.example.list.concat(data.list);
  },
  [types.COLLECT_SCROLL](state,height){
    state.scroll = height;
  },
  [types.COLLECT_SUBJECT_CHANGE](state, id){
    state.subjectId = id;
  },
  [types.COLLECT_RELOAD](state){
    state.scroll = 0;
    state.example.list = [];
    state.example.offset = '';
    state.example.isReset = true;
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
