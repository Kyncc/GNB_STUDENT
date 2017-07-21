import Vue from 'vue'
import axios from '@/components/axios/'
import * as types from './mutationTypes'

/** 获取练习册数据 */
export const getWorkbook = ({ state, rootState, commit }, params) => {
  let subjectId = (rootState.route.name.indexOf('math') !== -1 ? 2 : 7)
  let subject = (rootState.route.name.indexOf('math') !== -1 ? 'math' : 'physics')
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'workbook',
      params: {
        'token': rootState.common.user.token,
        'subjectId': subjectId
      }
    })
      .then((response) => {
        commit(types.WORKBOOK, { 'subject': subject, 'data': response.data.data })
        resolve(response)
      })
  })
}

/** 习题册列表 */
export const getWorkbookAdd = ({ rootState, commit, state }, params) => {
  let subjectId = (rootState.route.params.subject.indexOf('math') !== -1 ? 2 : 7)
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'workbook/list',
      params: {
        token: rootState.common.user.token,
        subjectId: subjectId,
        textbookId: rootState.route.query.id
      }
    })
      .then((response) => {
        commit(types.WORKBOOK_LIST, { data: response.data.data })
        resolve(response)
      })
  })
}

/** 习题册增加 */
export const workbookAdd = ({ rootState, commit, state }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'workbook/update',
      data: {
        token: rootState.common.user.token,
        type: 'add',
        workbookId: params.workbookId
      }
    })
      .then((response) => {
        commit(types.WORKBOOK_ADD, { type: params.type, pindex: params.pindex, index: params.index })
        Vue.$vux.toast.show({ text: '增加习题册成功', type: 'success', isShowMask: true, time: 1500 })
        resolve(response)
      })
  })
}

/** 习题册删除 */
export const workbookDel = ({ rootState, commit, state }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'workbook/update',
      data: {
        token: rootState.common.user.token,
        type: 'del',
        workbookId: params.workbookId
      }
    })
      .then((response) => {
        commit(types.WORKBOOK_DEL, { type: params.type, pindex: params.pindex, index: params.index })
        Vue.$vux.toast.show({ text: '删除习题册成功', type: 'success', isShowMask: true, time: 1500 })
        resolve(response)
      })
  })
}

/** 搜索习题册列表 */
export const getWorkbookSearch = ({ rootState, commit, state }, params) => {
  let subjectId = (rootState.route.params.subject.indexOf('math') !== -1 ? 2 : 7)
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'workbook/list',
      params: {
        token: rootState.common.user.token,
        subjectId: subjectId,
        workbookName: params.workbookName
      }
    })
      .then((response) => {
        commit(types.WORKBOOK_SEARCH, { data: response.data.data })
        resolve(response)
      })
  })
}

/** 练习册章节高度设置 */
export const setWorkbookScroll = ({ rootState, commit }, height) => {
  let subject = (rootState.route.name.indexOf('math') !== -1 ? 'math' : 'physics')
  commit(types.WORKBOOK_SCROLL, { subject: subject, height: height })
}

/** 练习册数据清空 */
export const workbookAddClear = ({ commit }) => {
  commit(types.WORKBOOK_LIST_CLEAR)
}

/** 搜索数据清空 */
export const workbookSearchClear = ({ commit }) => {
  commit(types.WORKBOOK_SEARCH_CLEAR)
}

/** 练习册数据清空 */
export const workbookClear = ({ rootState, commit }) => {
  let subject = (rootState.route.name.indexOf('math') !== -1 ? 'math' : 'physics')
  commit(types.WORKBOOK_CLEAR, { 'subject': subject })
}

/** 获取练习册章节数据 */
export const getWorkbookChapter = ({ state, rootState, commit }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'workbook/chapter',
      params: {
        'token': rootState.common.user.token,
        'workbookId': rootState.route.params.id
      }
    })
      .then((response) => {
        commit(types.WORKBOOK_CHAPTER, response.data.data)
        resolve(response)
      })
  })
}

/** 提交章节练习题 */
export const WorkbookExercisePost = ({ state, rootState, commit }, params) => {
  Vue.$vux.loading.show({ text: '请稍候' })
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'workbook/submit',
      data: {
        'answer': params.answer,
        'answerId': params.answerId,
        'token': rootState.common.user.token,
        'chapterId': rootState.route.params.id
      }
    })
      .then((response) => {
        Vue.$vux.loading.hide()
        Vue.$vux.toast.show({ text: '提交成功', type: 'success', isShowMask: true, time: 1500 })
        commit(types.WORKBOOK_EXERCISE_POST, response.data.data)
        commit(types.WORKBOOK_CHAPTER_CLEAR)
        resolve(response)
      })
      .catch((error) => {
        Vue.$vux.loading.hide()
        reject(error)
      })
  })
}

/** 章节数据清空 */
export const workbookChapterClear = ({ commit }) => {
  commit(types.WORKBOOK_CHAPTER_CLEAR)
}

/** 章节高度设置 */
export const setWorkbookChapterScroll = ({ commit }, height) => {
  commit(types.WORKBOOK_CHAPTER_SCROLL, height)
}

/** 获取练习册章节数据 */
export const getWorkbookExercise = ({ state, rootState, commit }, id) => {
  Vue.$vux.loading.show({ text: '请稍候' })
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'workbook/exercises',
      params: {
        'token': rootState.common.user.token,
        'chapterId': rootState.route.params.id || id
      }
    })
      .then((response) => {
        Vue.$vux.loading.hide()
        commit(types.WORKBOOK_EXERCISE, response.data.data)
        resolve(response)
      })
      .catch(() => {
        Vue.$vux.loading.hide()
      })
  })
}

/** 练习数据清空 */
export const workbookExerciseClear = ({ commit }) => {
  commit(types.WORKBOOK_EXERCISE_CLEAR)
}

/** 章节练习题答案变更 */
export const workbookExAnswerChange = ({ commit }, params) => {
  commit(types.WORKBOOK_EXERCISE_CHANGE, params)
}

/** 章节练习题拍照 */
export const workbookExCamera = ({ commit }, data) => {
  commit(types.WORKBOOK_EXERCISE_ERROR_ADD, data)
}

/** 章节练习题照片增加删除 */
export const workbookExCameraDel = ({ commit }, id) => {
  commit(types.WORKBOOK_EXERCISE_ERROR_DEL, id)
}

/** 提交章节错误练习题 */
export const workbookExErrorUpload = ({ state, rootState, commit }, params) => {
  Vue.$vux.loading.show({ text: '请稍候' })
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'workbook/exercise/uploader',
      data: {
        'wbeid': rootState.route.params.wbeid,
        'img': state.exercise.cameraList,
        'type': params.type,
        'chapterId': rootState.route.params.chapterId,
        'token': rootState.common.user.token
      }
    })
      .then((response) => {
        Vue.$vux.loading.hide()
        Vue.$vux.toast.show({ text: '提交成功', type: 'success', isShowMask: true, time: 1500 })
        commit(types.WORKBOOK_EXERCISE_ERROR_UPLOAD, response.data.data)
        resolve(response)
      })
      .catch((error) => {
        Vue.$vux.loading.hide()
        reject(error)
      })
  })
}

/** 练习题目高度设置 */
export const setWorkbookExersciseScroll = ({ commit }, height) => {
  commit(types.WORKBOOK_EXERCISE_SCROLL, height)
}

/** 上传照片删除 */
export const workbookUploadDel = ({ commit }, id) => {
  commit(types.WORKBOOK_UPLOAD_DEL, id)
}

/** 上传照片增加 */
export const workbookUploadAdd = ({ commit }, data) => {
  commit(types.WORKBOOK_UPLOAD_ADD, data)
}

/** 作业照片增加 */
export const workbookCamera = ({ commit }, data) => {
  commit(types.WORKBOOK_UPLOAD_CAMERA, data)
}

/** 上传照片 */
export const workbookUpload = ({ state, rootState, commit }) => {
  Vue.$vux.loading.show({ text: '请稍候' })
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'workbook/uploader',
      data: {
        'token': rootState.common.user.token,
        'cameraList': state.uploader.list,
        'chapterId': rootState.route.params.id
      }
    })
      .then((response) => {
        commit(types.WORKBOOK_UPLOAD, response.data.data)
        resolve(response)
        Vue.$vux.loading.hide()
      })
      .catch(() => {
        Vue.$vux.loading.hide()
      })
  })
}
