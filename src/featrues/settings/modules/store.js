import * as types from './mutationTypes'
import * as getters from './getters'
import * as actions from './actions'

const state = {
  adviceList:[],
  textbook:{
    math:[],
    physics:[]
  }
}


const mutations = {
  [types.ADVICE_LIST](state, data) {
    state.adviceList = data;
  },
  [types.TEXTBOOK_ALL_VERSION](state,data) {
    state.textbook.math = data.subjectOptions.math;
    if(data.subjectOptions.physics){
      state.textbook.physics = data.subjectOptions.physics;
    }else{
      state.textbook.physics = [];
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
