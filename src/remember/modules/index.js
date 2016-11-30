import * as types from '../mutationTypes'

const state = {
    subjectId:'2',
    my:[],  
    all:[],
    chapter:[], 
    chapterScroll:0,
    exercise:[],
    exerciseScroll:0,
    example:[]      
}

const mutations = {
  [types.REMEMBER_WORKBOOK_GET](state, data) {
      state.my = data.data;
      state.chapter =  [];
  },
  [types.REMEMBER_SUBJECT_CHANGE](state,id){
      state.subjectId = id;
      state.my = [];
      state.chapterScroll = 0;
      state.exerciseScroll = 0;
      state.all = [];  
      state.chapter = [];
  },
  [types.REMEMBER_CHAPTER_GET](state,data){
      state.chapter =  data.data;
  },
  [types.REMEMBER_CHAPTER_CLEAR](state,data){
      state.my = [];
      state.chapterScroll = 0;
      state.exerciseScroll = 0;
      state.all = [];  
      state.chapter =  [];
  }, 
  [types.REMEMBER_CHAPTER_SCROLL](state, height){
     state.chapterScroll = height;
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
