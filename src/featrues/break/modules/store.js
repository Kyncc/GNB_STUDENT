import * as types from './mutationTypes'
import * as getters from './getters'
import * as actions from './actions'

const state = {
  index: {
    list: [],
    scroll: 0,
    isReset:false,
  },
  list: {
    list:[],
    count:0,
    isReset:false,
    chapterName:'',
    scroll:0,
    offset:''
  },
  subjectId: '2'
}

const mutations = {
  [types.BREAK](state, data){
    state.index.list = data.data;
    state.index.isReset = false;
  },
  [types.BREAK_CHANGE_SUBJECT](state, id){
    state.subjectId = id;
  },
  [types.BREAK_CLEAR](state){
    state.index.list = [];
    state.index.scroll = 0;
    state.index.isReset = true;
  },
  [types.BREAK_SCOLLER](state, height) {
    state.index.scroll = height;
  },
  [types.BREAK_STATE_CHANGE](state, index) {
    state.index.list[index].checked = !state.index.list[index].checked
  },
  [types.BREAK_LIST](state, data) {
    if(data.length == 0){return;}
    state.list.chapterName = data.chapterName;
    state.list.isReset = false;
    state.list.count = data.recordSize;
    state.list.offset = data.offset;
    state.list.list = state.list.list.concat(data.list);
  },
  [types.BREAK_LIST_CLEAR](state) {
    state.list.isReset = true;
    state.list.list = [];
    state.list.count = 0;
    state.list.chapterName = '',
    state.list.scroll = 0;
    state.list.offset = '';
  },
  [types.BREAK_LIST_BACK](state, index) {
    state.list.count = --state.list.count;
    state.list.list.splice(index, 1);
  },
  [types.BREAK_LIST_SCOLLER](state, height) {
    state.list.scroll = height;
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
