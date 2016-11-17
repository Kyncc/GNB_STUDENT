import * as types from '../mutationTypes'

// const state = {
//     textbook:{
//         all:[
//           {
//             "textbookId": 1,
//             "textbookName": "必修101"
//           },
//           {
//             "textbookId": 2,
//             "textbookName": "必修101"
//           }
//         ],
//         my:[
//           {
//             "textbookId": 1,
//             "textbookName": "必修101"
//           },
//           {
//             "textbookId": 2,
//             "textbookName": "必修101"
//           }
//         ]
//     },
//     workbook:{
//         search:[],
//         all:[],
//         my:[]
//     },
//     userinfo:{},
//     textbookVersion:{
//       subjectType:[],
//       subjectOptions:{
//         physics:[],
//         math:[]
//       }
//     }
// }

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
    textbookVersion:{}
}



const mutations = {
  [types.TEXTBOOK_ADD](state, data) {
    state.textbook.all = data;
    state.textbook.my = [];
  },
  [types.TEXTBOOK_GET](state, data) {
     state.textbook.my = data;
  },
  [types.TEXTBOOK_RELOAD](state) {
     state.textbook.my = [];
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


  [types.USERINFO_GET](state, data) {
     state.userinfo = data;
  },
  [types.USERINFO_TEXTBOOKVERSION](state, data) {
     state.textbookVersion = data;
  }
}

export default {
  state,
  mutations
}
