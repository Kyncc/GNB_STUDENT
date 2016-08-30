import {
  GET_LOGIN_SUCCESS,
  GET_LOGIN_ERROR
} from '../mutationTypes'

const state = {
  userInfo:{
      headImg:'',
      mobile:'',
      name:'',
      token:''
  }
}

const mutations = {
  [GET_LOGIN_SUCCESS](state , data){
    state.userInfo.headImg = data.data.headImg;
    state.userInfo.mobile = data.data.mobile;
    state.userInfo.name = data.data.name;
    state.userInfo.token = data.data.token;
  },
  [GET_LOGIN_ERROR](state, err){
    console.log(err)
  }
}

export default {
  state,
  mutations
}