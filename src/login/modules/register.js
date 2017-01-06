import * as types from '../mutationTypes'

const state = {
  mobile:'',
  code:'',
  isTeacher:'',
  version:{
    math:[],
    physics:[]
  }
}

const mutations = {
  [types.REGISTER_MESSAGE](state , data){
    state.mobile = data.data.mobile;
    state.code = data.data.code;
    state.isTeacher = data.data.isTeacher;
  },
  [types.GET_TEXTBOOK_VERSION_SUCCESS](state , data){
    state.version.math = data.subjectOptions.math;
     if(data.subjectOptions.physics){
       state.version.physics = data.subjectOptions.physics;
     }else{
       state.version.physics = [];
     }
  }
}

export default {
  state,
  mutations
}