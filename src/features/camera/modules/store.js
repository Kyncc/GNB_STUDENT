import * as types from './mutationTypes'
import * as getters from './getters'
import * as actions from './actions'

const state = {
  options: {
    textbook: '',
    editionId: '',
    subject: '',
    grade: '10',
    textbookList: []
  },
  points: {
    list: [],
    scroll: 0
  },
  chapter: {
    list: [],
    scroll: 0
  },
  example: {
    list: [],
    offset: '',
    scroll: 0
  },
  choice: {
    list: [],
    offset: '',
    scroll: 0
  }
}

const mutations = {
  [types.CAMERA_OPTIONS_TEXTBOOK] (state, data) {
    state.options.textbookList = data
  },
  [types.CAMERA_OPTIONS] (state, data) {
    state.options = {subject: data.subject, grade: data.grade, textbook: data.textbook, editionId: data.editionId, textbookList: state.options.textbookList}
    state.points = { list: [], scroll: 0 }
    state.chapter = { list: [], scroll: 0 }
  },
  [types.CAMERA_SYNC] (state, data) {
    state.chapter.list = state.chapter.list ? state.chapter.list.concat(data.chaper) : data.chaper
  },
  [types.CAMERA_SYNC_SCROLL] (state, height) {
    state.choice.scroll = height
  },
  [types.CAMERA_GAOKAO] (state, data) {
    state.points.list = state.points.list ? state.points.list.concat(data.chaper) : data.chaper
  },
  [types.CAMERA_GAOKAO_SCROLL] (state, height) {
    state.points.scroll = height
  },
  [types.CAMERA_EXAMPLE] (state, data) {
    state.example.list = state.example.list ? state.example.list.concat(data.list) : data.list
    state.example.offset = data.offset
  },
  [types.CAMERA_EXAMPLE_SCROLL] (state, height) {
    state.example.scroll = height
  },
  [types.CAMERA_EXAMPLE_CLEAR] (state) {
    state.example = { list: [], offset: '', scroll: 0 }
  },
  [types.CAMERA_CHOICE] (state, data) {
    state.choice.list = state.choice.list ? state.choice.list.concat(data.list) : data.list
    state.choice.offset = data.offset
  },
  [types.CAMERA_INTO] (state, payload) {
    if (payload.form === 1) {
      state['example']['list'][payload.index]['isAssembly'] = payload.data.isAssembly
    } else {
      state['choice']['list'][payload.index]['isAssembly'] = payload.data.isAssembly
    }
  },
  [types.CAMERA_CHOICE_SCROLL] (state, height) {
    state.choice.scroll = height
  },
  [types.CAMERA_CHOICE_CLEAR] (state) {
    state.choice = { list: [], offset: '', scroll: 0 }
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
