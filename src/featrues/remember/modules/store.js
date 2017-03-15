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
    list:[]
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
    state.subjectId = id;
  },
  [types.WORKBOOK_STU](state, data) {
    state.workbook.list = data;
    state.workbook.isReset =  false;
  },
  [types.WORKBOOK_STU_CLEAR](state){
   state.workbook.list = [];
   state.workbook.isReset =  true;
  },
  //按章节
  [types.WORKBOOK_STU_CHAPTER](state,data){
    state.chapter.list =  data;
    state.chapter.isReset =  true;
  },
  [types.WORKBOOK_STU_CHAPTER_CLEAR](state){
    state.chapter.list =  [];
    state.chapter.isReset =  true;
    state.chapter.scroll =  0;
  },
  [types.WORKBOOK_STU_CHAPTER_SCROLL](state, height){
   state.chapter.scroll = height;
  },
  //练习
  [types.WORKBOOK_STU_EXERCISE](state,data){
    state.exercise.list = data;
    state.exercise.isReset =  false;
  },
  [types.WORKBOOK_STU_EXERCISE_CLEAR](state){
    state.exercise.list = [];
    state.exercise.isReset = true;
  },
  [types.WORKBOOK_STU_EXERCISE_SCROLL](state, height){
     state.exercise.scroll = height;
  },
  [types.WORKBOOK_STU_EXERCISE_CHANGE](state,data){
    if(data.type == '1'){
      state.exercise.list.a[0].b[data.pid].c[data.id].answer = !state.exercise.list.a[0].b[data.pid].c[data.id].answer;
    }else{
      state.exercise.list.a[data.pid].b[data.id].answer = !state.exercise.list.a[data.pid].b[data.id].answer;
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
