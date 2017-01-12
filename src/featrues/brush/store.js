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
  [types.BRUSH_ALL](state, data) {
    state.index.list = data.data;
  },
  [types.BRUSH_CHANGE_SUBJECT](state, id) {
    state.subjectId = id;
  },
  [types.BRUSH_CLEAR](state) {
    state.index.list = [];
    state.index.scoll = 0;
  },
  [types.BRUSH_SCOLLER](state, height) {
    state.index.scoll = height;
  },
  [types.BRUSH_STATE_CHANGE](state, index) {
    state.index.list[index].checked = !state.index.list[index].checked
  },
  [types.BRUSH_LIST](state, data) {
    if(data.data.length == 0){return;}
    state.list.isReset = false;
    state.list.chapterName = data.data.chapterName;
    state.list.count = data.data.recordSize;
    state.list.offset = data.data.offset;
    state.list.list = state.list.list.concat(data.data.detail);
  },
  [types.BRUSH_LIST_CLEAR](state) {
    state.list.isReset = true;
    state.list.list = [];
    state.list.count=0;
    state.list.chapterName='',
    state.list.scoll=0;
    state.list.offset = '';
  },
  [types.BRUSH_LIST_SCOLLER](state, height) {
    state.list.scoll = height;
  },
  [types.BRUSH_EXAMPLE](state, data) {
    state.example = data.data;
  },
  [types.BRUSH_EXAMPLE_CLEAR](state) {
    state.example = [];
  },
  [types.BRUSH_EXAMPLE_COLLECT_ADD](state) {
    state.example[0].collectTime = 1;
  },
  [types.BRUSH_EXAMPLE_COLLECT_REMOVE](state) {
    state.example[0].collectTime = 0;
  }
}

export default {
  state,
  mutations
}
