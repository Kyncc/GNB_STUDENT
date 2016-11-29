import * as types from '../mutationTypes'


const state = {
    cameraImg:'',
    //拍照历史
    subjectId:'2',
    history:{
      ids:[],
      list:[],
      totalPage:1,
      currentPage:1,
      scoll:'0'
    },
    //例题
    example:[],
    //搜题结果
    result:{
      id:'',
      ids:[],
      list:[]
    }
}

const mutations = {
  [types.GET_CAMERA_HISTORYIDS](state , data){
    state.history.ids = data.data.ids;
    state.history.totalPage = Number(data.data.totalPage);
  },
  [types.GET_CAMERA_HISTORYLIST](state , data){
    state.history.list = state.history.list.concat(data.data);
    state.history.currentPage++;
  },
  [types.DEL_CAMERA_HISTORYID](state,index){
    state.history.list.splice(index,1);
  },
  [types.CLEAR_CAMERA_HISTORY](state){
    state.history.ids = [];
    state.history.list = [];
    state.history.totalPage = 1;
    state.history.currentPage = 1;
    state.history.scoll = 0;
  },
  [types.CAMERA_SCOLLER_HEIGHT](state,height){
      state.scoll = height;
  },
  [types.CAMERA_CHANGE_SUBJECT](state,id){
      state.subjectId = id;
  },
  //例题操作
  [types.CAMERA_EXAMPLE](state , data){
    state.example = data.data;
  },
  [types.CAMERA_EXAMPLE_CLEAR](state , data){
    state.example = [];
  },
  [types.CAMERA_EXAMPLE_COLLECT_ADD](state){
      state.example[0].collectTime = 1;
  },
  [types.CAMERA_EXAMPLE_COLLECT_REMOVE](state){
      state.example[0].collectTime = 0;
  },
  //搜题结果
  [types.GET_CAMERA_RESULTIDS](state , data){
    state.result.ids = data.data.ids;
    state.result.id = data.data.id;
  },
  [types.GET_CAMERA_RESULTLIST](state , data){
    state.result.code = data.code;
    state.result.list = data.data;
    state.result.msg = data.msg;
  },
  [types.SET_CAMERA_IMG](state, data){
    state.cameraImg = data;
  }
}

export default {
  state,
  mutations
}
