import {
  GET_COLLECT_EXAMPLEIDS_SUCCESS,
  GET_COLLECT_EXAMPLEIDS_ERROR,
  GET_COLLECT_CAMERALEIDS_SUCCESS,
  GET_COLLECT_CAMERALEIDS_ERROR
} from '../mutationTypes'

const state = {
    example:{
      code:'',
      ids:[],
      list:[{}],
      msg:''
    },
    camera:{
      code:'',
      ids:[],
      list:[{}],
      msg:''
    }
}

const mutations = {
  [GET_COLLECT_EXAMPLEIDS_SUCCESS](state , data){
    state.code = data.data.code;
    state.ids = data.data.ids;
    state.msg = data.msg;
  },
  [GET_COLLECT_EXAMPLEIDS_ERROR](state, data){
    state.msg = data.msg;
  },
  [GET_COLLECT_CAMERALEIDS_SUCCESS](state , data){
    state.code = data.data.code;
    state.ids = data.data.ids;
    state.msg = data.msg;
  },
  [GET_COLLECT_CAMERALEIDS_ERROR](state, data){
    state.msg = data.msg;
  }
}

export default {
  state,
  mutations
}