import axios from 'config/http'
import * as _ from 'config/whole'
import * as types from './mutationTypes'

/** 获取用户信息*/
export const getUserInfo = ({ rootState,commit }) => {
   _.busy();
   return new Promise((resolve, reject)=> { 
      axios({
        method: 'get',
        url: 'user/getUserInfo',
        params: {
          token:rootState.login.token
        }
      })
      .then((response) => {
        commit(types.USERINFO,response.data);
        resolve(response);
        _.leave();
      })
      .catch((error) => {
        _.leave();
      })
  });
}

/**设置用户信息*/
export const setUserInfo = ({ rootState,commit },params) => {
  return new Promise((resolve, reject)=> { 
    axios({
      method: 'post',
      url: 'user/updateUserInfo',
      data: {
        ...params,
        token:rootState.login.token
      }
    })
    .then((response) => {
      resolve(response);
    })
  });
}

/**上传头像*/
export const uploadHeadImg = ({ rootState,commit }, params) => {
  _.busy();
  return new Promise((resolve, reject)=> { 
    axios({
      method:'post',
      url: 'user/headImg',
      data: {
        file:params.file,
        token:rootState.login.token
      }
    })
    .then((response) => {
        commit(types.UPLOAD_USER_PHOTO,response.data);
        resolve(response);
        _.leave();
    })
    .catch((error) => {
        _.leave();
    })
  });
}

/**上传头像*/
export const setHeadImg = ({ commit }, data) => {
  commit(types.SET_USER_PHOTO,data);
}
