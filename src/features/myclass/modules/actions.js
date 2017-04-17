import axios from '@/components/axios/'
import * as types from './mutationTypes'

/** 获取班级列表 */
export const getMyClass = ({ rootState, commit }, params) => {
  commit(types.CLASS_MY_CLEAR)// 进来先清空
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'class/myClassList',
      params: {
        token: rootState.common.user.token
      }
    })
    .then((response) => {
      commit(types.CLASS_MY, response.data.data)
      resolve(response)
    })
  })
}

/** 获取班级同学列表 */
export const getMyClassmateList = ({ rootState, commit }, params) => {
  commit(types.CLASS_MYCLASSMATE_CLEAR)   // 进来先清空
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'class/myClassmateList',
      params: {
        classCode: rootState.route.params.code,
        token: rootState.common.user.token
      }
    })
    .then((response) => {
      commit(types.CLASS_MYCLASSMATE, response.data.data)
      resolve(response)
    })
  })
}

/** 获取班级码查找 */
export const getMyClassSearchClass = ({ rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'class/bindClass',
      params: {
        classCode: params.classCode,
        token: rootState.common.user.token
      }
    })
    .then((response) => {
      commit(types.CLASS_SEARCH, response.data.data)
      resolve(response)
    })
  })
}

/** 加入班级 */
export const postMyClassInto = ({ rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'class/intoClass',
      data: {
        classCode: params.classCode,
        token: rootState.common.user.token
      }
    })
    .then((response) => {
      commit(types.CLASS_ADD, response.data.data)
      resolve(response)
    })
  })
}
