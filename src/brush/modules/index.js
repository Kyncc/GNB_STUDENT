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
  //刷题型列表
  [types.BRUSH_LIST](state,data){
    if(data.data.length == 0){return;}
    state.list.current++;
    state.list.totalPage = data.data.totalPage;
    state.list.list = state.list.list.concat(data.data);
  },
  [types.BRUSH_LIST_CLEAR](state){
    state.list.currentPage = 1;
    state.list.totalPage=1;
    state.list.list=[];
    state.list.scoll=0;
  },
  [types.BRUSH_LIST_ACTION](state,index){
      state.list.list.splice(index,1);
  },
  [types.BRUSH_LIST_SCOLLER](state,height){
      state.list.scoll = height;
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
