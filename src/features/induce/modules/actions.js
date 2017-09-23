import axios from '@/components/axios/'
import * as types from './mutationTypes'

function getSubjectId (name) {
  let subjectId = ''
  if (name.indexOf('math') >= 0) {
    subjectId = '2'
  } else if (name.indexOf('physics') >= 0) {
    subjectId = '7'
  } else if (name.indexOf('chemistry') >= 0) {
    subjectId = '8'
  }
  return subjectId
}

/** 获取章节数据 */
export const getInduce = ({ rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'induce',
      params: {
        textbook_id: params.textbook_id,
        token: rootState.common.user.token
      }
    })
      .then((response) => {
        commit(types.INDUCE, { 'subject': params.subject, 'data': response.data.data })
        resolve(response)
      })
  })
}

/** 首页章节浏览器高度 */
export const setInduceScroll = ({ rootState, commit }, params) => {
  commit(types.INDUCE_SCROLL, { 'subject': params.subject, 'height': params.height })
}

/** 清除章节数据 */
export const clearInduce = ({ rootState, commit }, params) => {
  commit(types.INDUCE_CLEAR, { 'subject': params.subject })
}

/** 获取刷题列表 */
export const getInduceList = ({ state, rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'induce/list',
      params: {
        token: rootState.common.user.token,
        chapter_id: rootState.route.params.chapterId,
        subject_id: getSubjectId(rootState.route.params.subject),
        type: params.type,
        currentChapterId: state['exercise'][params.type]['currentChapterId'],
        currentExercisesId: state['exercise'][params.type]['currentExercisesId']
      }
    })
      .then((response) => {
        commit(types.INDUCE_LIST, { 'data': response.data.data, 'type': params.type })
        resolve(response)
      })
  })
}

/** 题型处置 */
export const induceTotalAction = ({ state, rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'induce/update',
      data: {
        exerciseId: params.id,
        chapter_id: params.chapter_id,
        type: params.type,
        subject_id: getSubjectId(rootState.route.params.subject),
        token: rootState.common.user.token
      }
    })
      .then((response) => {
        commit(types.INDUCE_ACTION, params.index)
        resolve(response)
      })
  })
}

/** 题型处置 */
export const induceBack = ({ state, rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'induce/back',
      data: {
        exerciseId: params.id,
        chapter_id: params.chapter_id,
        type: params.type,
        subject_id: getSubjectId(rootState.route.params.subject),
        token: rootState.common.user.token
      }
    })
      .then((response) => {
        commit(types.INDUCE_BACK, { type: params.type, index: params.index })
        resolve(response)
      })
  })
}

/** 清空列表数据 */
export const induceListClear = ({ rootState, commit }, params) => {
  commit(types.INDUCE_LIST_CLEAR, { 'type': params.type })
}

/** 设置列表高度 */
export const setInduceListScroll = ({ rootState, commit }, params) => {
  commit(types.INDUCE_LIST_SCROLL, { 'type': params.type, 'height': params.height })
}
