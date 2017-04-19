import * as types from './mutationTypes'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'

const mutations = {
  [types.WORKBOOK] (state, payload) {
    state.workbook[payload.subject].list = payload.data
    state.workbook[payload.subject].isReset = false
  },
  [types.WORKBOOK_CLEAR] (state, payload) {
    state.workbook[payload.subject].list = []
    state.workbook[payload.subject].isReset = true
  },
  // 章节
  [types.WORKBOOK_CHAPTER] (state, data) {
    state.chapter.list = data
    state.chapter.isReset = false
  },
  [types.WORKBOOK_CHAPTER_CLEAR] (state) {
    state.chapter.list = []
    state.chapter.isReset = true
    state.chapter.scroll = 0
  },
  [types.WORKBOOK_CHAPTER_SCROLL] (state, height) {
    state.chapter.scroll = height
  },
  // 练习
  [types.WORKBOOK_EXERCISE] (state, data) {
    state.exercise.list = data
    state.exercise.isReset = false
  },
  [types.WORKBOOK_EXERCISE_CLEAR] (state) {
    state.exercise.list = []
    state.exercise.isReset = true
    state.exercise.scroll = 0
    // state.uploader.list = []
    // state.uploader.camera = ''
  },
  [types.WORKBOOK_EXERCISE_SCROLL] (state, height) {
    state.exercise.scroll = height
  },
  [types.WORKBOOK_EXERCISE_POST] (state, data) {
    state.chapter.isReset = true
    state.exercise.list = data
    // state.exercise.list.isUsed = true
  },
  [types.WORKBOOK_EXERCISE_CHANGE] (state, data) {
    if (data.type === '1') {
      state.exercise.list.a[0].b[data.pid].c[data.id].answer = !state.exercise.list.a[0].b[data.pid].c[data.id].answer
    } else {
      state.exercise.list.a[data.pid].b[data.id].answer = !state.exercise.list.a[data.pid].b[data.id].answer
    }
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
