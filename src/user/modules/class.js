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
  myClass:{
    class:[],
    classmate:[],
    searchClass:[],
    intoClass:{
      classCode:'',
      data:[]
    }
  }
}

const mutations = {
  [GET_CLASS_LIST](state, data) {
    state.myClass.class = data.data;
  },
  [GET_CLASSMATE_LIST](state, data) {
    state.myClass.classmate = data.data;
  },
  [GET_CLASS_BYCODE](state, data) {
    state.myClass.searchClass = data.data;
  },
  [POST_INTO_CLASS](state, data) {
    state.myClass.intoClass.data = data.data;
  }
}

export default {
  state,
  mutations
}
