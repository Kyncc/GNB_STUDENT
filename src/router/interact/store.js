import * as types from './mutationTypes'

const state = {
    index:{
      code:'',
      hasNewClassMsg:'',
      hasNewCorretMsg:'',
      hasNewSystemMsg:'',
      classMsgNew:'',
      correctMsgNew:'',
      systemMsgNew:'',
      msg:''
    },
    system:{
      code:'',
      list:{},
      msg:''
    },
    class:{
      code:'',
      list:{},
      msg:''
    },
    correct:{
      code:'',
      list:{},
      msg:''
    }
}

const mutations = {
  [types.GET_INTERACT_HOME_SUCCESS](state , data){
    state.index.code = data.data.code;
    state.index.hasNewClassMsg = data.data.hasNewClassMsg;
    state.index.hasNewCorretMsg = data.data.hasNewCorretMsg;
    state.index.hasNewSystemMsg = data.data.hasNewSystemMsg;
    state.index.classMsgNew = data.data.classMsgNew;
    state.index.correctMsgNew = data.data.correctMsgNew;
    state.index.systemMsgNew = data.data.systemMsgNew;
    state.index.msg = data.msg;
  },
  [types.GET_INTERACT_HOME_ERROR](state , data){
    state.index.code = data.data.code;
    state.index.msg = data.msg;
  },
  [types.GET_INTERACT_SYSTEM_SUCCESS](state , data){
    state.system.code = data.data.code;
    state.system.list = data.data;
    state.system.msg = data.msg;
  },
  [types.GET_INTERACT_SYSTEM_ERROR](state, data){
    state.system.msg = data.msg;
  },
  [types.GET_INTERACT_CORRECT_SUCCESS](state , data){
    state.correct.code = data.data.code;
    state.correct.list = data.data;
    state.correct.msg = data.msg;
  },
  [types.GET_INTERACT_CORRECT_ERROR](state, data){
    state.correct.msg = data.msg;
  },
  [types.GET_INTERACT_CLASS_SUCCESS](state , data){
    state.class.code = data.data.code;
    state.class.list = data.data;
    state.class.msg = data.msg;
  },
  [types.GET_INTERACT_CLASS_ERROR](state, data){
    state.class.msg = data.msg;
  }
}
export default {
  state,
  mutations
}