import * as types from './mutationTypes'

const state = {
  grade:'',
  headImg:'',
  mobile:'',
  name:'',
  school:'',
  sex	:'',
  subject	:[],
  subjectType:[],
  textbook:[],
}

const mutations = {
  [types.GET_INFO](state , data){
    state.grade = data.data.grade;
    state.headImg = data.data.headImg;
    state.mobile = data.data.mobile;
    state.name = data.data.name;
    state.school = data.data.school;
    state.sex = data.data.sex;
    state.subject = data.data.subject;
    state.subjectType = data.data.subjectType;
    state.textbook = data.data.subjectType;
  },
  [types.SET_USER_PHOTO](state, data) {
    state.headImg = data;
  }
}

export default {
  state,
  mutations
}