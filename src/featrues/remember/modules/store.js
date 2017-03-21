import * as types from './mutationTypes'
import * as actions from './actions'
import * as getters from './getters'

const state = {
  subjectId:'2',
  workbook:{             //练习册列表
    list:[],
    isReset:false
  },
  chapter:{            //练习册章节
    list:[],
    scroll:0,
    isReset:false
  },
  uploader:{
    list:[
      "http://img.guinaben.com/workbookPic/038a4aac4c74498d94214c1de495daa8-answer-420684.png?imageView2/2/w/90/h/120/q/75|imageslim",
      "http://img.guinaben.com/workbookPic/038a4aac4c74498d94214c1de495daa8-answer-420684.png?imageView2/2/w/90/h/120/q/75|imageslim",
      "data:image/png;base64,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"
    ]
  },
  exercise:{            //练习
    list:[],
    scroll:0,
    isReset:false
  }
}

const mutations = {
  //练习册
  [types.WORKBOOK_STU_SUBJECT_CHANGE](state,id){
    state.subjectId = id
  },
  [types.WORKBOOK_STU](state, data) {
    state.workbook.list = data
    state.workbook.isReset =  false
  },
  [types.WORKBOOK_STU_CLEAR](state){
   state.workbook.list = []
   state.workbook.isReset =  true
  },
  //按章节
  [types.WORKBOOK_STU_CHAPTER](state,data){
    state.chapter.list =  data
    state.chapter.isReset =  false
  },
  [types.WORKBOOK_STU_CHAPTER_CLEAR](state){
    state.chapter.list =  []
    state.chapter.isReset =  true
    state.chapter.scroll =  0
  },
  [types.WORKBOOK_STU_CHAPTER_SCROLL](state, height){
   state.chapter.scroll = height
  },
  //练习
  [types.WORKBOOK_STU_EXERCISE](state,data){
    state.exercise.list = data
    state.exercise.isReset = false
  },
  [types.WORKBOOK_STU_EXERCISE_CLEAR](state){
    state.exercise.list = []
    state.exercise.isReset = true
  },
  [types.WORKBOOK_STU_EXERCISE_SCROLL](state, height){
     state.exercise.scroll = height
  },
  [types.WORKBOOK_STU_EXERCISE_POST](state){
    state.chapter.isReset = true
    state.exercise.list.isUsed = true
  },
  [types.WORKBOOK_STU_EXERCISE_CHANGE](state,data){
    if(data.type == '1'){
      state.exercise.list.a[0].b[data.pid].c[data.id].answer = !state.exercise.list.a[0].b[data.pid].c[data.id].answer
    }else{
      state.exercise.list.a[data.pid].b[data.id].answer = !state.exercise.list.a[data.pid].b[data.id].answer
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
