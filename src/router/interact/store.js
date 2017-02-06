import * as types from './mutationTypes'

const state = {
    index:{
      hasNewClassMsg:'',
      hasNewCorretMsg:'',
      hasNewSystemMsg:'',
      classMsgNew:'',
      correctMsgNew:'',
      systemMsgNew:'',
    }
}

const mutations = {
  [types.INTERACT_HOME](state,data){
    state.index.hasNewClassMsg = data.data.hasNewClassMsg;
    state.index.hasNewCorretMsg = data.data.hasNewCorretMsg;
    state.index.hasNewSystemMsg = data.data.hasNewSystemMsg;
    state.index.classMsgNew = data.data.classMsgNew;
    state.index.correctMsgNew = data.data.correctMsgNew;
    state.index.systemMsgNew = data.data.systemMsgNew;
  }
}
export default {
  state,
  mutations
}