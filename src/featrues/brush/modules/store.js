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
  [types.BRUSH](state, data){
    state.index.list = data;
    state.index.isReset = false;
  },
  [types.BRUSH_CHANGE_SUBJECT](state, id){
    state.subjectId = id;
  },
  [types.BRUSH_CLEAR](state){
    state.index.list = [];
    state.index.scroll = 0;
    state.index.isReset = true;
  },
  [types.BRUSH_SCOLLER](state, height) {
    state.index.scroll = height;
  },
  [types.BRUSH_ACTION](state, index) {
    state.list.count = --state.list.count;
    state.list.list.splice(index, 1)
  },
  [types.BRUSH_STATE_CHANGE](state, index) {
    state.index.list[index].checked = !state.index.list[index].checked
  },
  [types.BRUSH_LIST](state, data) {
    if(data.length == 0){return;}
    state.list.chapterName = data.chapterName;
    state.list.isReset = false;
    state.list.count = data.recordSize;
    state.list.offset = data.offset;
    state.list.list = state.list.list.concat(data.list);
  },
  [types.BRUSH_LIST_CLEAR](state) {
    state.list.isReset = true;
    state.list.list = [];
    state.list.count = 0;
    state.list.chapterName = '';
    state.list.scroll = 0;
    state.list.offset = '';
  },
  [types.BRUSH_LIST_SCOLLER](state, height) {
    state.list.scroll = height;
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
