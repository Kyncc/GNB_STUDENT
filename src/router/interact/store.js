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
  }
}
export default {
  state,
  mutations
}