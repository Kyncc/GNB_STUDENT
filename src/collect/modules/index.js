import * as types from '../mutationTypes'

const state = {
    example:{
      ids:[],
      list:[],
      current:1,
      totalPage:1,
      scoll:0
    },
    camera:{
      ids:[],
      list:[],
      current:1,
      totalPage:1,
      scoll:0
    },
    subjectId:'2'
}

const mutations = {
  [types.GET_COLLECT_EXAMPLEIDS](state , data){
    state.example.ids = state.example.ids.concat(data.data.ids);
    // state.example.ids = data.data.ids;
    state.example.totalPage = data.data.totalPage;
  },
  [types.GET_COLLECT_EXAMPLELIST](state , data){
     state.example.list = state.example.list.concat(data.data);
    // state.example.list = data.data;
  },
  [types.GET_COLLECT_CAMERALEIDS](state , data){
    state.camera.ids = data.data.ids;
    state.camera.totalPage = data.data.totalPage;
  },
  [types.GET_COLLECT_CAMERALELIST](state , data){
    state.camera.list = data.data;
  },
  [types.COLLECT_SUBJECT_CHANGE](state, id){
     state.subjectId = id;
  },
  [types.COLLECT_RELOAD](state){
     state.example.ids = [];
     state.example.list = [];
     state.example.totalPage = 1;
     state.example.current = 1;
     state.example.scoll=0
     state.camera.ids = [];
     state.camera.list = [];
     state.camera.totalPage = 1;
     state.camera.current = 1;
     state.camera.scoll=0
  }
}

export default {
  state,
  mutations
}
