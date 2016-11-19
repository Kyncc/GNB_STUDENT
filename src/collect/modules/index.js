import * as types from '../mutationTypes'

const state = {
    example:{
      ids:[],
      list:[],
      detail:[],
      current:1,
      totalPage:1
    },
    camera:{
      ids:[],
      list:[],
      detail:[],
      current:1,
      totalPage:1,
    },
    scoll:0,
    subjectId:'2'
}

const mutations = {
  [types.GET_COLLECT_EXAMPLEIDS](state , data){
    state.example.ids = data.data.ids;
    state.example.totalPage = data.data.totalPage;
  },
  [types.GET_COLLECT_EXAMPLELIST](state , data){
     if(data.data.length == 0){return;}
     state.example.current++;
     state.example.list = state.example.list.concat(data.data);
  },
  [types.GET_COLLECT_EXAMPLEDETAIL](state , data){
     state.example.detail = data.data;
  },
  [types.GET_COLLECT_CAMERALEIDS](state , data){
    state.camera.ids = data.data.ids;
    state.camera.totalPage = data.data.totalPage;
  },
  [types.GET_COLLECT_CAMERALELIST](state , data){
    if(data.data.length == 0){return;}
    state.camera.current++;
    state.camera.list = state.camera.list.concat(data.data);
  },
  [types.GET_COLLECT_CAMERADETAIL](state , data){
     state.camera.detail = data.data;
  },
  [types.COLLECT_SCOLL](height){
     state.scoll = height;
  },
  [types.COLLECT_SUBJECT_CHANGE](state, id){
     state.subjectId = id;
  },
  [types.COLLECT_RELOAD](state){
     state.example.ids = [];
     state.example.list = [];
     state.example.totalPage = 1;
     state.example.current = 1;
     state.scoll=0;
     state.camera.ids = [];
     state.camera.list = [];
     state.camera.totalPage = 1;
     state.camera.current = 1;
  }
}

export default {
  state,
  mutations
}
