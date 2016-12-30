import * as types from './mutationTypes'

const state = {
    subjectId:'2',
    my:[],              //我的练习册
    all:[],             //全部练习册
    page:[],            //练习册页码
    pageScroll:0,
    chapter:[],         //练习册章节
    chapterScroll:0,
    exercise:[],        //练习记错
    exerciseScroll:0,
    example:[]         
}

const mutations = {
  [types.REMEMBER_SUBJECT_CHANGE](state,id){
      state.subjectId = id;
      state.page = [];
      state.my = [];
      state.pageScroll = 0;
      state.chapterScroll = 0;
      state.exerciseScroll = 0;
      state.all = [];  
      state.chapter = [];
  },

  [types.REMEMBER_CHAPTER_GET](state,data){
      state.chapter =  data.data;
  },
  [types.REMEMBER_CHAPTER_CLEAR](state,data){
      state.chapterScroll = 0;
      state.chapter =  [];
  }, 
  [types.REMEMBER_CHAPTER_SCROLL](state, height){
     state.chapterScroll = height;
  },
  
  [types.REMEMBER_PAGE_GET](state,data){
      state.page =  data.data;
  },
  [types.REMEMBER_PAGE_CLEAR](state,data){
      state.pageScroll = 0;
      state.page =  [];
  }, 
  [types.REMEMBER_PAGE_SCROLL](state, height){
     state.pageScroll = height;
  },
  
  [types.REMEMBER_WORKBOOK_GET](state, data) {
      state.my = data.data;
      state.chapter =  [];
  },
  [types.REMEMBER_WORKBOOK_ALL](state,data){
      state.all =  data.data;
  },
  [types.REMEMBER_WORKBOOK_ALL_CLEAR](state){
      state.all = [];   
  },
  [types.REMEMBER_WORKBOOK_ADD](state){
      state.all = [];   
      state.my = [];
  },

  [types.REMEMBER_EXERCISE](state,data){
      state.exercise = data.data;
  },
  [types.REMEMBER_EXERCISE_CLEAR](state){
      state.exercise = [];
      state.exerciseScroll = 0;    
  },
  [types.REMEMBER_EXERCISE_SCROLL](state, height){
     state.exerciseScroll = height;
  },
  [types.REMEMBER_EXERCISE_CHANGE](state,Pid,id,type){
      if(type == '1'){
        state.exercise.a[0].b[Pid].c[id].answer = !state.exercise.a[0].b[Pid].c[id].answer;   
      }else{
        state.exercise.a[Pid].b[id].answer = !state.exercise.a[Pid].b[id].answer;   
      }
  },

  [types.REMEMBER_EXAMPLE](state,data){
      state.example = data.data;
  },
  [types.REMEMBER_EXAMPLE_CLEAR](state){
      state.example = [];   
  },
  [types.REMEMBER_EXAMPLE_COLLECT_ADD](state){
      state.example[0].collectTime = 1;
  },
  [types.REMEMBER_EXAMPLE_COLLECT_REMOVE](state){
      state.example[0].collectTime = 0;
  }


}

export default {
  state,
  mutations
}
