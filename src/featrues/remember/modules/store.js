import * as types from './mutationTypes'
import * as actions from './actions'
import * as getters from './getters'

const state = {
  subjectId:'2',
  workbook:{             //练习册列表
    list:[],
    isReset:false 
  },         
  page:{                //练习册页码
    list:[],
    scroll:0,
    isReset:false 
  },           
  chapter:{            //练习册章节
    list:[],
    scroll:0,
    isReset:false 
  },   
  exercise:{            //练习
    list:[],
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
  
  //按页码
  [types.WORKBOOK_STU_PAGE](state,data){
      state.page.list =  data;
      state.page.isReset =  false;
  },
  [types.WORKBOOK_STU_PAGE_CLEAR](state){
      state.page.scroll = 0;
      state.page.list =  [];
      state.page.isReset =  true;
  }, 
  [types.WORKBOOK_STU_PAGE_SCROLL](state, height){
     state.page.scroll = height;
  },
  
  //练习
  [types.WORKBOOK_STU_EXERCISE](state,data){
      state.exercise.list = data;
      state.exercise.isReset =  false;
  },
  [types.WORKBOOK_STU_EXERCISE_CLEAR](state){
      state.exercise.list = [];
      state.exercise.isReset = true;    
  }

}

export default {
  state,
  mutations,
  actions,
  getters
}
