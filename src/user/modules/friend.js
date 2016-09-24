import {
  GET_INVITE_STUDENT_LIST,
  GET_INVITE_CODE
} from '../mutationTypes'

const state = {
  inviteStudentList: [],
  inviteCode: ''
}

const mutations = {
  [GET_INVITE_STUDENT_LIST](state, data) {
    state.inviteStudentList = data
  },
  [GET_INVITE_CODE](state, data) {
    state.inviteCode = data
  }
}

export default {
  state,
  mutations
}
