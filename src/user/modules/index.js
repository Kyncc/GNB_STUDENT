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
    }
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
  }
}

export default {
  state,
  mutations
}
