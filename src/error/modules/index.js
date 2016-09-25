import {
  GET_ERROR_INDEXIDS_SUCCESS,
  GET_ERROR_INDEXIDS_ERROR,
  GET_ERROR_INDEXLIST_SUCCESS,
  GET_ERROR_INDEXLIST_ERROR,

  GET_ERROR_MOREIDS_SUCCESS,
  GET_ERROR_MOREIDS_ERROR,
  GET_ERROR_MORELIST_SUCCESS,
  GET_ERROR_MORELIST_ERROR,

  GET_ERROR_LISTIDS_SUCCESS,
  GET_ERROR_LISTIDS_ERROR,
  GET_ERROR_LISTLISTS_SUCCESS,
  GET_ERROR_LISTLIST_ERROR,

  GET_ERROR_RECOMMENDIDS_SUCCESS,
  GET_ERROR_RECOMMENDIDS_ERROR,
  GET_ERROR_RECOMMENDLIST_SUCCESS,
  GET_ERROR_RECOMMENDLIST_ERROR,

  POST_ERROR_RECOMMENDIDS_SUCCESS,
  POST_ERROR_RECOMMENDIDS_ERROR
}from '../mutationTypes'


const state = {
    index:{
      code:'',
      ids:[],
      list:{},
      msg:''
    },
    more:{
      code:'',
      ids:[],
      list:{},
      msg:''
    },
    list:{
      code:'',
      ids:[],
      list:{},
      msg:''
    },
    recommend:{
      code:'',
      ids:[],
      list:{},
      msg:''
    }
}


const mutations = {
   //错题本首页
  [GET_ERROR_INDEXIDS_SUCCESS](state , data){
    state.example.code = data.data.code;
    state.example.ids = data.data.ids;
    state.example.msg = data.msg;
  },
  [GET_ERROR_INDEXIDS_ERROR](state, data){
    state.example.msg = data.msg;
  },
  [GET_ERROR_INDEXLIST_SUCCESS](state , data){
    state.example.code = data.code;
    state.example.list = data.data;
    state.example.msg = data.msg;
  },
  [GET_ERROR_INDEXLIST_ERROR](state, data){
    state.example.msg = data.msg;
  },
  //更多例题
  [GET_ERROR_MOREIDS_SUCCESS](state , data){
    state.camera.code = data.data.code;
    state.camera.ids = data.data.ids;
    state.camera.msg = data.msg;
  },
  [GET_ERROR_MOREIDS_ERROR](state, data){
    state.camera.msg = data.msg;
  },
  [GET_ERROR_MORELIST_SUCCESS](state , data){
    state.camera.code = data.data.code;
    state.camera.list = data.data.list;
    state.camera.msg = data.msg;
  },
  [GET_ERROR_MORELIST_ERROR](state, data){
    state.camera.msg = data.msg;
  },
 //错题列表
  [GET_ERROR_LISTIDS_SUCCESS](state , data){
    state.camera.code = data.data.code;
    state.camera.ids = data.data.ids;
    state.camera.msg = data.msg;
  },
  [GET_ERROR_LISTIDS_ERROR](state, data){
    state.camera.msg = data.msg;
  },
  [GET_ERROR_LISTLISTS_SUCCESS](state , data){
    state.camera.code = data.data.code;
    state.camera.list = data.data.list;
    state.camera.msg = data.msg;
  },
  [GET_ERROR_LISTLIST_ERROR](state, data){
    state.camera.msg = data.msg;
  },
   //推荐列表
  [GET_ERROR_RECOMMENDIDS_SUCCESS](state , data){
    state.camera.code = data.data.code;
    state.camera.ids = data.data.ids;
    state.camera.msg = data.msg;
  },
  [GET_ERROR_RECOMMENDIDS_ERROR](state, data){
    state.camera.msg = data.msg;
  },
  [GET_ERROR_RECOMMENDIDS_SUCCESS](state , data){
    state.camera.code = data.data.code;
    state.camera.list = data.data.list;
    state.camera.msg = data.msg;
  },
  [GET_ERROR_RECOMMENDIDS_ERROR](state, data){
    state.camera.msg = data.msg;
  },
  //提交推荐题目结果
  [POST_ERROR_RECOMMENDIDS_SUCCESS](state , data){
    state.camera.code = data.data.code;
    state.camera.msg = data.msg;
  },
  [POST_ERROR_RECOMMENDIDS_ERROR](state, data){
    state.camera.msg = data.msg;
  }
}






export default {
  state,
  mutations
}