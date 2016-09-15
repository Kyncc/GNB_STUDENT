import {
  GET_USER_INFO
} from '../mutationTypes'

const state = {
  grade: '',
  name: '',
  school: '',
  subject: '',
  sex: '',
}

const mutations = {
  [GET_USER_INFO](state, data) {
    state.grade = data.grade
    state.name = data.name
    state.school = data.school
    state.subject = data.subject
    state.sex = data.sex
  }
}

export default {
  state,
  mutations
}
