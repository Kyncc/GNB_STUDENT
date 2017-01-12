import * as types from '../mutationTypes'

const state = {
    userinfo:{},
    //学生教材版本
    version:{
      math:[],
      physics:[]
    },
    invite:{
      code:'',
      status:'',
      list:[]
    },
    subject:[]
}



const mutations = {
  //邀请
  [types.INVITE_STUDENT_LIST](state, data) {
    state.invite.list = data
  },
  [types.INVITE](state, data) {
    state.invite.code = data.inviteCode
    state.invite.status = data.isInvited
  },
  [types.USERINFO_GET](state, data) {
     state.userinfo = data;
  },
  [types.USERINFO_TEXTBOOKVERSION](state, data) {
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
