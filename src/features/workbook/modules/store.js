import * as types from './mutationTypes'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'

const mutations = {
  [types.WORKBOOK] (state, payload) {
    state['workbook'][payload.subject]['list'] = payload.data
  },
  [types.WORKBOOK_CLEAR] (state, payload) {
    state['workbook'][payload.subject]['list'] = []
    state['workbook'][payload.subject]['scroll'] = 0
  },
  [types.WORKBOOK_SCROLL] (state, payload) {
    state['workbook'][payload.subject].scroll = payload.height
  },
  [types.WORKBOOK_LIST] (state, payload) {
    state.workbook.add = payload.data.textbook
  },
  [types.WORKBOOK_LIST_CLEAR] (state) {
    state.workbook.add = []
  },
  [types.WORKBOOK_SEARCH] (state, payload) {
    state.workbook.search = payload.data.textbook
  },
  [types.WORKBOOK_SEARCH_CLEAR] (state) {
    state.workbook.search = []
  },
  [types.WORKBOOK_ADD] (state, payload) {
    state['workbook'][payload.type][payload.pindex]['list'][payload.index].status = true
  },
  [types.WORKBOOK_DEL] (state, payload) {
    state['workbook'][payload.type][payload.pindex]['list'][payload.index].status = false
  },
  // 章节
  [types.WORKBOOK_CHAPTER] (state, data) {
    state.chapter.list = data
    state.chapter.isReset = false
  },
  [types.WORKBOOK_CHAPTER_CLEAR] (state) {
    state.chapter.list = []
    state.chapter.isReset = true
  },
  [types.WORKBOOK_CHAPTER_SCROLL] (state, height) {
    state.chapter.scroll = height
  },
  // 练习
  [types.WORKBOOK_EXERCISE] (state, data) {
    state.exercise.list = data
    state.exercise.isReset = false
    state.exercise.scroll = 0
  },
  [types.WORKBOOK_EXERCISE_CLEAR] (state) {
    state.exercise.list = []
    state.exercise.cameraList = []
    state.exercise.isReset = true
    state.uploader.list = []
    state.uploader.camera = ''
  },
  [types.WORKBOOK_EXERCISE_SCROLL] (state, height) {
    state.exercise.scroll = height
  },
  [types.WORKBOOK_EXERCISE_POST] (state, data) {
    state.chapter.isReset = true
    state.exercise.list = data
  },
  [types.WORKBOOK_EXERCISE_CHANGE] (state, data) {
    if (data.type === '1') {
      state.exercise.list.a[0].b[data.pid].c[data.id].answer = !state.exercise.list.a[0].b[data.pid].c[data.id].answer
    } else {
      state.exercise.list.a[data.pid].b[data.id].answer = !state.exercise.list.a[data.pid].b[data.id].answer
    }
  },
  [types.WORKBOOK_EXERCISE_ERROR_ADD] (state, data) {
    state.exercise.cameraList = []
    state.exercise.cameraList.push(data)
  },
  [types.WORKBOOK_EXERCISE_ERROR_DEL] (state, index) {
    state.exercise.cameraList.splice(index, 1)
  },
  // [types.WORKBOOK_EXERCISE_ERROR_CAMERA] (state, data) {
  //   state.exercise.cameraList.push(data)
  // },
  [types.WORKBOOK_EXERCISE_ERROR_UPLOAD] (state) {
    state.exercise.isReset = true
    state.exercise.camera = ''
    state.exercise.cameraList = []
  },
  // 上传
  [types.WORKBOOK_UPLOAD_DEL] (state, index) {
    state.uploader.list.splice(index, 1)
  },
  [types.WORKBOOK_UPLOAD_ADD] (state, data) {
    state.uploader.list.push(data)
    state.uploader.camera = ''
  },
  [types.WORKBOOK_UPLOAD_CAMERA] (state, data) {
    state.uploader.camera = data
  },
  [types.WORKBOOK_UPLOAD] (state, data) {
    state.uploader.list = []
    state.exercise.list = data
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
