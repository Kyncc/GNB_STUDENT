import {
  GET_NUMERICAL_LIST,
  GET_BILL_LIST,
  GET_MEMBER_INFO
} from '../mutationTypes'

const state = {
  numericalList: [],
  myBillList: [],
  memberInfo: {}
}

const mutations = {
  [GET_NUMERICAL_LIST](state, data) {
    state.numericalList = data
  },
  [GET_BILL_LIST](state, data) {
    state.myBillList = data
  },
  [GET_MEMBER_INFO](state, data) {
    state.memberInfo = data
  }
}

export default {
  state,
  mutations
}
