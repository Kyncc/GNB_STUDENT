import axios from '@/components/axios/'
import * as types from './mutationTypes'

/** 获取班级列表 */
export const getMyClass = ({ rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'class',
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

/** 清空班级列表 */
export const myClassClear = ({ commit }) => {
  commit(types.CLASS_MY_CLEAR)
}

/** 获取班级同学列表 */
export const getMyClassmateList = ({ rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'class/classmate',
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

/** 清空班级同学列表 */
export const myClassmateClear = ({ commit }) => {
  commit(types.CLASS_MYCLASSMATE_CLEAR)
}

/** 获取班级码查找 */
export const getMyClassSearchClass = ({ rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'class/search',
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

/** 清空搜索班级 */
export const myClassSearchClear = ({ commit }) => {
  commit(types.CLASS_SEARCH_CLEAR)
}

/** 加入班级 */
export const postMyClassInto = ({ rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'class/add',
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
