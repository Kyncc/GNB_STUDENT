import {
  GET_CAMERA_HISTORYIDS_SUCCESS,
  GET_CAMERA_HISTORYIDS_ERROR,

  GET_CAMERA_HISTORYLIST_SUCCESS,
  GET_CAMERA_HISTORYLIST_ERROR,

  DEL_CAMERA_HISTORYID_SUCCESS,
  DEL_CAMERA_HISTORYID_ERROR,

  GET_CAMERA_RESULTIDS_SUCCESS,
  GET_CAMERA_RESULTIDS_ERROR,

  GET_CAMERA_RESULTLIST_SUCCESS,
  GET_CAMERA_RESULTLIST_ERROR,
  //获取拍错题下例题
  GET_CAMERA_HISTORYEXAMPLEID_SUCCESS,
  GET_CAMERA_HISTORYEXAMPLEID_ERROR,

  POST_CAMERA_RESULTSEARCH_SUCCESS,
  POST_CAMERA_RESULTSEARCH_ERROR,

  POST_CAMERA_EXAMPLE_SUCCESS,
  POST_CAMERA_EXAMPLE_ERROR
}from '../mutationTypes'



const state = {
    //拍照历史
    history:{
      code:'',
      ids:[],
      list:[],
      totalPage:'1',
      msg:''
    },
    //例题
    example:{
      code:'',
      list:[],
      msg:''
    },
    //移除历史
    del:{
      code:'',
      msg:''
    },
    //搜题结果
    result:{
      code:'',
      id:'',
      ids:[],
      list:[],
      msg:'',
    },
    
    //设置例题
    setExample:{
      code:'',
      msg:''
    },
    //提交人工搜索
    search:{
      code:'',
      msg:''
    }
}


const mutations = {
  [GET_CAMERA_HISTORYIDS_SUCCESS](state , data){
    state.history.code = data.data.code;
    state.history.ids = data.data.ids;
    state.history.totalPage = data.data.totalPage;
    state.history.msg = data.msg;
  },
  [GET_CAMERA_HISTORYIDS_ERROR](state, data){
    state.history.msg = data.msg;
  },

  [GET_CAMERA_HISTORYLIST_SUCCESS](state , data){
    state.history.code = data.code;
    state.history.list = data.data;
    state.history.msg = data.msg;
  },
  [GET_CAMERA_HISTORYLIST_SUCCESS](state, data){
    state.history.msg = data.msg;
  },

  [DEL_CAMERA_HISTORYID_SUCCESS](state , data){
    state.del.code = data.data.code;
    state.del.msg = data.msg;
  },
  [DEL_CAMERA_HISTORYID_ERROR](state, data){
    state.del.msg = data.msg;
  },

  [GET_CAMERA_RESULTIDS_SUCCESS](state , data){
    state.result.code = data.data.code;
    state.result.ids = data.data.ids;
    state.result.msg = data.msg;
  },
  [GET_CAMERA_RESULTIDS_ERROR](state, data){
    state.result.msg = data.msg;
  },

  [GET_CAMERA_RESULTLIST_SUCCESS](state , data){
    state.result.code = data.data.code;
    state.result.list = data.data;
    state.result.msg = data.msg;
  },
  [GET_CAMERA_RESULTLIST_ERROR](state, data){
    state.result.msg = data.msg;
  },

  [GET_CAMERA_HISTORYEXAMPLEID_SUCCESS](state , data){
    state.example.code = data.data.code;
    state.example.list = data.data;
    state.example.msg = data.msg;
  },
  [GET_CAMERA_HISTORYEXAMPLEID_ERROR](state, data){
    state.example.msg = data.msg;
  },

  [POST_CAMERA_RESULTSEARCH_SUCCESS](state , data){
    state.search.code = data.data.code;
    state.search.msg = data.msg;
  },
  [POST_CAMERA_RESULTSEARCH_ERROR](state, data){
    state.search.msg = data.msg;
  },


  [POST_CAMERA_EXAMPLE_SUCCESS](state , data){
    state.setExample.code = data.data.code;
    state.setExample.msg = data.msg;
  },
  [POST_CAMERA_EXAMPLE_ERROR](state, data){
    state.setExample.msg = data.msg;
  },

}



export default {
  state,
  mutations
}