import * as types from './mutationTypes'
import * as actions from './actions'
import * as getters from './getters'

const state = {
  headImg:'',
  name:'',
  school:'',
  sex:'', 
  mobile:'',
  grade:'',
  subjectType:[],
  textbook:[],
  subject:[],
  version:'',
  ios_version:'',
  bufferImg:''
}

const mutations = {
  [types.USERINFO](state , data){
    state.textbook = data.data.textbook[0];
    state.headImg = data.data.headImg;
    state.name = data.data.name;
    state.mobile = data.data.mobile;
    state.school = data.data.school;
    state.sex = data.data.sex;
    state.grade = data.data.grade;
    state.version = data.data.version;
    state.ios_version = data.data.ios_version;
    state.subject = data.data.subject;
    state.subjectType = data.data.subjectType;
  },
  [types.UPLOAD_USER_PHOTO](state,data){
    state.headImg = data.data.headImg;
  },
  [types.SET_USER_PHOTO](state,data){
    state.bufferImg = data;
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}