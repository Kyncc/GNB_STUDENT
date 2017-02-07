import * as types from './mutationTypes'

const state = {
  example: [],
  index: {
    list: [],
    scoll: 0
  },
  list: {
    list:[],
    count:0,
    isReset:true,
    chapterName:'',
    scoll:0,
    offset:''
  },
  subjectId: '2'
}

const mutations = {
  [types.PASS_ALL](state, data) {
    state.index.list = data.data;
  },
  [types.PASS_CHANGE_SUBJECT](state, id) {
    state.subjectId = id;
  },
  [types.PASS_CLEAR](state) {
    state.index.list = [];
    state.index.scoll = 0;
  },
  [types.PASS_SCOLLER](state, height) {
    state.index.scoll = height;
  },
  [types.PASS_STATE_CHANGE](state, index) {
    state.index.list[index].checked = !state.index.list[index].checked
  },
  [types.PASS_LIST](state, data) {
    if(data.data.length == 0){return;}
    state.list.chapterName = data.data.chapterName;
    state.list.isReset = false;
    state.list.count = data.data.recordSize;
    state.list.offset = data.data.offset;
    state.list.list = state.list.list.concat(data.data.list);
  },
  [types.PASS_LIST_BACK](state, index) {
    state.list.count = --state.list.count;
    state.list.list.splice(index, 1)
  },
  [types.PASS_LIST_CLEAR](state) {
    state.list.isReset = true;
    state.list.list = [];
    state.list.count=0;
    state.list.chapterName='',
    state.list.scoll=0;
    state.list.offset = '';
  },
  [types.PASS_LIST_SCOLLER](state, height) {
    state.list.scoll = height;
  },
  [types.PASS_EXAMPLE](state, data) {
    state.example = data.data;
  },
  [types.PASS_EXAMPLE_CLEAR](state) {
    state.example = [];
  },
  [types.PASS_EXAMPLE_COLLECT_ADD](state) {
    state.example[0].collectTime = 1;
  },
  [types.PASS_EXAMPLE_COLLECT_REMOVE](state) {
    state.example[0].collectTime = 0;
  }
}

export default {
  state,
  mutations
}
