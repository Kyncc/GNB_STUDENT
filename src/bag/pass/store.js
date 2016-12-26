import * as types from './mutationTypes'

const state = {
  example: [],
  index: {
    list: [],
    scoll: 0
  },
  list: {
    list: [],
    count: 0,
    scoll: 0,
    chapterName: '',
    currentPage: 1,
    totalPage: 1
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
    state.list.count = data.data.count;
    state.list.chapterName = data.data.chapterName;
    state.list.totalPage = data.data.totalPage;
    state.list.list = state.list.list.concat(data.data.list);
    state.list.currentPage++;
  },
  [types.PASS_LIST_CLEAR](state) {
    state.list.list = [];
    state.list.currentPage = 1;
    state.list.totalPage = 1
    state.list.count = 0;
    state.list.chapterName = '';
    state.list.scoll = 0;
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
