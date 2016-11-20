import * as types from '../mutationTypes'


const state = {
     index:{
        list:[],
        scoll:0
     },
     example:[],
     list:{
         currentPage:1,
         totalPage:1,
         list:[],
         scoll:0
     },
     subjectId:'2'
}

const mutations = {
  //刷题型首页
  [types.BRUSH_ALL](state, data) {
      state.index.list = data.data;
  },
  [types.BRUSH_CHANGE_SUBJECT](state,id){
      state.subjectId = id;
  },
  [types.BRUSH_CLEAR](state){
      state.index.list = [];
      state.index.scoll = 0;
  },
  [types.BRUSH_SCOLLER](state,height){
      state.index.scoll = height;
  },
  [types.BRUSH_STATE_CHANGE](state,index){
      state.index.list[index].checked = !state.index.list[index].checked
  },
  [types.BRUSH_EXAMPLE](state,data){
      state.example = data.data;
  },
  [types.BRUSH_EXAMPLE_CLEAR](state){
      state.example = [];   
  },
  [types.BRUSH_EXAMPLE_COLLECT_ADD](state){
      state.example[0].collectTime = 1;
  },
  [types.BRUSH_EXAMPLE_COLLECT_REMOVE](state){
      state.example[0].collectTime = 0;
  }
}

export default {
  state,
  mutations
}
