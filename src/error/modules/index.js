import  * as types from '../mutationTypes'

const state = {
    index:{
      ids:[],
      list:[],
      detail:[],
      currentPage:'1',
      totalPage:'1',
      scoll:'0',
      selected:'0'
    },
    more:{
      ids:[],
      list:[],
      detail:[]
    },
    list:{
      ids:[],
      list:[],
      detail:[]
    },
    recommend:{
      ids:[],
      list:[]
    },
    subjectId:'2'
}


const mutations = {
   //错题本首页
  [types.GET_ERROR_INDEXIDS](state,data){
    state.index.ids = data.data.ids;
    state.index.totalPage = data.data.totalPage;
  },
  [types.GET_ERROR_INDEXLIST](state , data){
    state.index.list = state.index.list.concat(data.data);
    state.index.currentPage++;
  },
  [types.ERROR_RELOAD](state){
    state.index.ids = [];
    state.index.list = [];
    state.index.scoll = '0';
    state.index.currentPage = '1';
    state.index.totalPage = '1';
  },
  [types.ERROR_SUBJECT_CHANGE](state, id){
     state.subjectId = id;
  },
  [types.ERROR_INDEXDETAIL](state, data){
     state.index.detail = data.data;
  },
  [types.ERROR_TAB_CHANGE](state, type){
     state.index.selected = type;
  },
  //更多例题
  [types.GET_ERROR_MOREIDS](state , data){
    state.more.ids = data.data.ids;
    state.more.totalPage = data.data.totalPage;
  },
  [types.GET_ERROR_MORELIST](state , data){
    state.more.list = data.data;
  },
 //错题列表
  [types.GET_ERROR_LISTIDS](state , data){
    // debugger;
    state.list.ids = data.data.ids;
  },
  [types.GET_ERROR_LISTLIST](state , data){
    state.list.list = data.data;
  },
   //推荐列表
  [types.GET_ERROR_RMDIDS](state,data){
    state.recommend.ids = data.data.ids;
  },
  [types.GET_ERROR_RMDLIST](state , data){
    state.recommend.list = data.data;
  }
}

export default {
  state,
  mutations
}
