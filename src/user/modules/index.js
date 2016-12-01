import * as types from '../mutationTypes'

const state = {
    textbook:{
        all:[],
        my:[],
        subjectId:'2'
    },
    workbook:{
        all:[],
        my:[],
        subjectId:'2'
    },
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
  //教材
  [types.TEXTBOOK_ADD](state, data) {
    state.textbook.all = data;
    state.textbook.my = [];
  },
  [types.TEXTBOOK_GET](state, data) {
     state.textbook.my = data;
  },
  [types.TEXTBOOK_GET_ALL](state, data) {
     state.textbook.all = data;
  },
  [types.TEXTBOOK_SUBJECT_CHANGE](state, id) {
     state.textbook.subjectId = id;
     state.textbook.my = [];
     state.textbook.all = [];
  },
  [types.TEXTBOOK_RELOAD](state) {
     state.textbook.my = [];
     state.textbook.all = [];
  },
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

  //练习册
  [types.WORKBOOK_ADD](state, data) {
    state.workbook.all = data;
    state.workbook.my = [];
  },
  [types.WORKBOOK_GET](state, data) {
     state.workbook.my = data;
  },
  [types.WORKBOOK_RELOAD](state) {
     state.workbook.my = [];
     state.workbook.all = [];
  },
  [types.WORKBOOK_GET_ALL](state, data) {
     state.workbook.all = data;
  },
  [types.WORKBOOK_SUBJECT_CHANGE](state, id) {
     state.workbook.subjectId = id;
     state.workbook.my = [];
     state.workbook.all = [];
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
