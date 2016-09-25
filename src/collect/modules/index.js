import {
  GET_COLLECT_EXAMPLEIDS_SUCCESS,
  GET_COLLECT_EXAMPLEIDS_ERROR,
  GET_COLLECT_EXAMPLELIST_SUCCESS,
  GET_COLLECT_EXAMPLELIST_ERROR,
  GET_COLLECT_CAMERALEIDS_SUCCESS,
  GET_COLLECT_CAMERALEIDS_ERROR,
  GET_COLLECT_CAMERALELIST_SUCCESS,
  GET_COLLECT_CAMERALELIST_ERROR
}from '../mutationTypes'

const state = {
    example:{
      code:'',
      ids:[],
      list:[],
      totalPage:'1',
      msg:''
    },
    camera:{
      code:'',
      ids:[],
      list:[],
      msg:''
    }
}

const mutations = {
  [GET_COLLECT_EXAMPLEIDS_SUCCESS](state , data){
    state.example.code = data.data.code;
    state.example.ids = state.example.ids.concat(data.data.ids);
    state.example.totalPage = data.data.totalPage;
    state.example.msg = data.msg;
  },
  [GET_COLLECT_EXAMPLEIDS_ERROR](state, data){
    state.example.msg = data.msg;
  },
  [GET_COLLECT_EXAMPLELIST_SUCCESS](state , data){
    state.example.code = data.code;
    state.example.list = state.example.list.concat(data.data);
    state.example.msg = data.msg;
  },
  [GET_COLLECT_EXAMPLELIST_ERROR](state, data){
    state.example.msg = data.msg;
  },
  [GET_COLLECT_CAMERALEIDS_SUCCESS](state , data){
    state.camera.code = data.data.code;
    state.camera.ids = data.data.ids;
    state.camera.msg = data.msg;
  },
  [GET_COLLECT_CAMERALEIDS_ERROR](state, data){
    state.camera.msg = data.msg;
  },
  [GET_COLLECT_CAMERALELIST_SUCCESS](state , data){
    state.camera.code = data.data.code;
    state.camera.list = data.data.list;
    state.camera.msg = data.msg;
  },
  [GET_COLLECT_CAMERALELIST_ERROR](state, data){
    state.camera.msg = data.msg;
  }
}

export default {
  state,
  mutations
}