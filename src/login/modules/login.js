import {
  GET_LOGIN_SUCCESS,
  GET_LOGIN_ERROR,
  GET_LOGIN_FAILED,
  GET_LOGIN_CLEAR
} from '../mutationTypes'

const state = {
  userInfo:{
    headImg:'',
    mobile:'',
    name:'',
    msg:'',
    token:''
  }
}

const mutations = {
  [GET_LOGIN_SUCCESS](state , data){
    state.userInfo.headImg = data.data.headImg;
    state.userInfo.mobile = data.data.mobile;
    state.userInfo.name = data.data.name;
    state.userInfo.token = data.data.token;
    state.userInfo.msg = data.data.msg;
  },
  [GET_LOGIN_FAILED](state , msg){
    state.userInfo.msg = msg;
  },
  [GET_LOGIN_ERROR](state, err){
    console.log(err)
  }
}

export default {
  state,
  mutations
}