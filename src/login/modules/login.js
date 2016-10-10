import {
  GET_LOGIN_SUCCESS,
  GET_LOGIN_ERROR,
  GET_LOGIN_FAILED,
  GET_LOGIN_CLEAR,
  SET_HEAD_IMG
} from '../mutationTypes'

const state = {
  userInfo:{
    headImg:localStorage.getItem('headImg')?localStorage.getItem('headImg'):' ',
    mobile:localStorage.getItem('mobile')?localStorage.getItem('mobile'):' ',
    name:localStorage.getItem('name')?localStorage.getItem('name'):' ',
    isVip:localStorage.getItem('isVip')?localStorage.getItem('isVip'):' ',
    balance:localStorage.getItem('balance')?localStorage.getItem('balance'):' ',
    numerical:localStorage.getItem('numerical')?localStorage.getItem('numerical'):' ',
    token: localStorage.getItem('token')
  },
  msg:''
}

const mutations = {
  [GET_LOGIN_SUCCESS](state, data){
    // state.userInfo.headImg =data.data.headImg;
    // state.userInfo.mobile = data.data.mobile;
    // state.userInfo.name = data.data.name;
    //state.userInfo.token = data.data.token;
    // state.userInfo.isVip = data.data.isVip;
    // state.userInfo.balance = data.data.balance;
    // state.userInfo.numerical = data.data.numerical;
    localStorage.setItem('headImg',data.data.headImg);
    localStorage.setItem('mobile',data.data.mobile);
    localStorage.setItem('name',data.data.name);
    localStorage.setItem('token',data.data.token);
    localStorage.setItem('isVip',data.data.isVip);
    localStorage.setItem('balance',data.data.balance);
    localStorage.setItem('numerical',data.data.numerical);
    //state.msg = data.msg;
  },
  [GET_LOGIN_FAILED](state , data){
    state.msg = data.msg;
  },
  [SET_HEAD_IMG](state, data) {
    state.userInfo.headImg = data;
  }
}

export default {
  state,
  mutations
}
