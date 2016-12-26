import * as types from '../mutationTypes'

const state = {
    userinfo:{},
    //学生教材版本
    version:{
      math:[],
      physics:[]
    },
    settings:{
      adviceList:[],
      appVersion:''
    },
    class:{
      my:[],
      classmate:{},
      searchClass:[]
    },
    invite:{
      code:'',
      status:'',
      list:[]
    },
    subject:[]
}



const mutations = {
  //我的班级
  [types.CLASS_MY_GET](state,data) {
     state.class.my = data;
  },
  [types.CLASS_MYCLASSMATE_GET](state,data) {
     state.class.classmate = data[0];
  },
  [types.CLASS_SEARCH](state,data) {
     state.class.searchClass = data;
  },
  [types.CLASS_ADD](state) {
     state.class.my = [];
  },
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
  },
  //反馈历史
  [types.GET_ADVICE_LIST](state, data) {
    state.settings.adviceList = data;
  },
  //APP版本
  [types.GET_VERSION](state, data) {
    state.settings.appVersion = data
  }
}

export default {
  state,
  mutations
}
