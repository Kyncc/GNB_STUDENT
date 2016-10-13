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
  GET_ERROR_LISTLIST_SUCCESS,
  GET_ERROR_LISTLIST_ERROR,

  GET_ERROR_RMDIDS_SUCCESS,
  GET_ERROR_RMDIDS_ERROR,
  GET_ERROR_RMDLIST_SUCCESS,
  GET_ERROR_RMDLIST_ERROR,

  POST_ERROR_RECOMMENDIDS_SUCCESS,
  POST_ERROR_RECOMMENDIDS_ERROR
}from '../mutationTypes'

const state = {
    index:{
      code:'',
      ids:[],
      list:[],
      msg:'',
      totalPage:'1'
    },
    more:{
      code:'',
      ids:[1,2,3,4,5],
      list:[],
      msg:''
    },
    list:{
      code:'',
      ids:[],
      list:[],
      msg:''
    },
    recommend:{
      code:'',
      ids:[],
      list:[],
      msg:''
    },
    recommendPost:{
      code:'',
       msg:''
    }
}


const mutations = {
   //错题本首页
  [GET_ERROR_INDEXIDS_SUCCESS](state,data){
    state.index.code = data.data.code;
    state.index.ids = data.data.ids;
    state.index.msg = data.msg;
    state.index.totalPage = data.data.totalPage;
  },
  [GET_ERROR_INDEXIDS_ERROR](state, data){
    state.index.msg = data.msg;
  },
  [GET_ERROR_INDEXLIST_SUCCESS](state , data){
    state.index.code = data.code;
    state.index.list = data.data;
    state.index.msg = data.msg;
  },
  [GET_ERROR_INDEXLIST_ERROR](state, data){
    state.index.msg = data.msg;
  },
  //更多例题
  [GET_ERROR_MOREIDS_SUCCESS](state , data){
    state.more.code = data.code;
    state.more.ids = data.data.ids;
    state.more.msg = data.msg;
    state.more.totalPage = data.data.totalPage;
  },
  [GET_ERROR_MOREIDS_ERROR](state, data){
    state.more.msg = data.msg;
  },
  [GET_ERROR_MORELIST_SUCCESS](state , data){
    state.more.code = data.data.code;
    state.more.list = data.data;
    state.more.msg = data.msg;
  },
  [GET_ERROR_MORELIST_ERROR](state, data){
    state.more.msg = data.msg;
  },
 //错题列表
  [GET_ERROR_LISTIDS_SUCCESS](state , data){
    // debugger;
    state.list.code = data.code;
    state.list.ids = data.data.ids;
    state.list.msg = data.msg;
  },
  [GET_ERROR_LISTIDS_ERROR](state, data){
    state.list.msg = data.msg;
  },
  [GET_ERROR_LISTLIST_SUCCESS](state , data){
    state.list.code = data.code;
    state.list.list = data.data;
    state.list.msg = data.msg;
  },
  [GET_ERROR_LISTLIST_ERROR](state, data){
    state.list.msg = data.msg;
  },
   //推荐列表
  [GET_ERROR_RMDIDS_SUCCESS](state,data){
    state.recommend.code = data.data.code;
    state.recommend.ids = data.data.ids;
    state.recommend.msg = data.msg;
  },
  [GET_ERROR_RMDIDS_ERROR](state, data){
    state.recommend.msg = data.msg;
  },
  [GET_ERROR_RMDLIST_SUCCESS](state , data){
    state.recommend.code = data.data.code;
    state.recommend.list = data.data;
    state.recommend.msg = data.msg;
  },
  [GET_ERROR_RMDLIST_ERROR](state, data){
    state.recommend.msg = data.msg;
  },
  //提交推荐题目结果
  [POST_ERROR_RECOMMENDIDS_SUCCESS](state , data){
    state.recommendPost.code = data.code;
    state.recommendPost.msg = data.msg;
  },
  [POST_ERROR_RECOMMENDIDS_ERROR](state, data){
    state.recommendPost.msg = data.msg;
  }
}






export default {
  state,
  mutations
}
