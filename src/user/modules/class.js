import {
  GET_CLASS_LIST,
  GET_CLASSMATE_LIST,
  POST_INTO_CLASS,
  GET_CLASS_BYCODE
} from '../mutationTypes'


/**我的班级
 * class:获取班级列表
 * classmate:班级成员名单
 * intoClass:加入班级
 * searchClass:搜索班级
 */
const state = {
  class:[],
  classmate:[],
  searchClass:[],
  intoClass:{
    classCode:'',
    data:[]
  }
}

const mutations = {
  [GET_CLASS_LIST](state, data) {
    state.class = data;
  },
  [GET_CLASSMATE_LIST](state, data) {
    state.classmate = data;
  },
  [GET_CLASS_BYCODE](state, data) {
    state.searchClass = data;
  },
  [POST_INTO_CLASS](state, data) {
    state.intoClass.data = data;
  }
}

export default {
  state,
  mutations
}
