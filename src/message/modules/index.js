import {
  GET_MESSAGE_SYSTEM_SUCCESS,
  GET_MESSAGE_SYSTEM_ERROR,
  GET_MESSAGE_CORRECT_SUCCESS,
  GET_MESSAGE_CORRECT_ERROR,
  GET_MESSAGE_CLASS_SUCCESS,
  GET_MESSAGE_CLASS_ERROR
}from '../mutationTypes'


const state = {
    system:{
      code:'',
      list:[],
      msg:''
    },
    class:{
      code:'',
      list:[],
      msg:''
    },
    correct:{
      code:'',
      list:[],
      msg:''
    }
}

const mutations = {
  [GET_MESSAGE_SYSTEM_SUCCESS](state , data){
    state.system.code = data.data.code;
    state.system.list = data.data.list;
    state.system.msg = data.msg;
  },
  [GET_MESSAGE_SYSTEM_ERROR](state, data){
    state.example.msg = data.msg;
  },
  [GET_MESSAGE_CORRECT_SUCCESS](state , data){
    state.system.code = data.data.code;
    state.system.list = data.data.list;
    state.system.msg = data.msg;
  },
 [GET_MESSAGE_CORRECT_ERROR](state, data){
    state.example.msg = data.msg;
  },
  [GET_MESSAGE_CLASS_SUCCESS](state , data){
    state.system.code = data.data.code;
    state.system.list = data.data.list;
    state.system.msg = data.msg;
  },
  [GET_MESSAGE_CLASS_ERROR](state, data){
    state.example.msg = data.msg;
  }
}
export default {
  state,
  mutations
}