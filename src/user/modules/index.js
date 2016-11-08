import * as types from '../mutationTypes'

const state = {
    textbook:{
        all:[{}],
        my:[{}]
    },
    workbook:{
        search:[{}],
        all:[{}],
        my:[{}]
    },
    userinfo:{},
    textbookVersion:{}
}

const mutations = {
  [types.TEXTBOOK_ADD](state, data) {
    state.textbook.all = data;
  },
  [types.TEXTBOOK_GET_ALL](state, data) {
     state.textbook.my = data;
  },
  [types.WORKBOOK_GET](state, data) {
     state.workbook.my = data;
  },
  [types.WORKBOOK_GET_ALL](state, data) {
     state.workbook.all = data;
  },
  [types.WORKBOOK_GET_SEARCH](state, data) {
     state.workbook.all = data;
  },
  [types.USERINFO_GET](state, data) {
     state.userinfo = data;
  },
  [types.USERINFO_TEXTBOOKVERSION](state, data) {
     state.textbookVersion = data;
  }
}

export default {
  state,
  mutations
}
