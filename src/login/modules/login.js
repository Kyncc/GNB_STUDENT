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
    isVip:'0',
    balance:'0',
    numerical:'0',
    token:''
  }
}

const mutations = {
  [GET_LOGIN_SUCCESS](state , data){
    state.userInfo.headImg =data.headImg;
    state.userInfo.mobile = data.mobile;
    state.userInfo.name = data.name;
    state.userInfo.token = data.token;
    state.userInfo.msg = data.msg;
    state.userInfo.isVip = data.isVip;
    state.userInfo.balance = data.balance;
    state.userInfo.numerical = data.numerical;
  },
  [GET_LOGIN_FAILED](state , msg){
    state.userInfo.msg = msg;
  }
}

export default {
  state,
  mutations
}