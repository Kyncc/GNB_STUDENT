import Vue from 'vue'
import axios from '@/components/axios/'
import * as types from './mutationTypes'

/** 获取例题信息 */
export const getExample = ({ rootState, commit }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'exerciseList',
      params: {
        ids: [rootState.route.params.id],
        subject_id: rootState.route.params.subjectId,
        token: rootState.common.user.token
      }
    })
    .then((response) => {
      commit(types.EXAMPLE, response.data.data)
      resolve(response)
    })
  })
}

/** 取消例题收藏 */
export const collectRemove = ({ rootState, commit, dispatch }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'collect/update',
      data: {
        id: rootState.route.params.id,
        subject_id: rootState.route.params.subjectId,
        type: 'del',
        token: rootState.common.user.token
      }
    })
    .then((response) => {
      Vue.$vux.toast.show({text: '取消收藏成功', type: 'text', time: 1000, position: 'bottom'})
      commit(types.COLLECT_REMOVE)
      dispatch('clearCollect')
      resolve(response)
    })
  })
}

/** 例题收藏 */
export const collectAdd = ({ rootState, commit, dispatch }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'collect/update',
      data: {
        id: rootState.route.params.id,
        subject_id: rootState.route.params.subjectId,
        type: 'add',
        token: rootState.common.user.token
      }
    })
    .then((response) => {
      Vue.$vux.toast.show({text: '收藏成功', type: 'text', time: 1000, position: 'bottom'})
      commit(types.COLLECT_ADD)
      dispatch('clearCollect')
      resolve(response)
    })
  })
}

/** 清空例题 */
export const exampleClear = ({ commit }) => {
  commit(types.EXAMPLE_CLEAR)
}
