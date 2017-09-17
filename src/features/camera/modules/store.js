import * as types from './mutationTypes'
import * as getters from './getters'
import * as actions from './actions'

const state = {
  chapter: {
    math: {
      list: [],
      scroll: 0
    },
    physics: {
      list: [],
      scroll: 0
    }
  },
  points: {
    math: {
      list: [],
      scroll: 0
    },
    physics: {
      list: [],
      scroll: 0
    }
  },
  uploader: {
    list: [],
    camera: 'https://blog.ygxdxx.com/img/random/material-2.png'
    // camera: ''
  }
}

const mutations = {
  [types.CAMERA_CHAPTER] (state, payload) {
    state['chapter'][payload.subject]['list'] = payload.data
  },
  [types.CAMERA_CHAPTER_CLEAR] (state, payload) {
    state['chapter'][payload.subject]['list'] = []
    state['chapter'][payload.subject]['scroll'] = 0
  },
  [types.CAMERA_CHAPTER_SCROLL] (state, payload) {
    state['chapter'][payload.subject]['scroll'] = payload.height
  },
  [types.CAMERA_POINTS] (state, payload) {
    state['points'][payload.subject]['list'] = payload.data
  },
  [types.CAMERA_POINTS_CLEAR] (state, payload) {
    state['points'][payload.subject]['list'] = []
    state['points'][payload.subject]['scroll'] = 0
  },
  [types.CAMERA_POINTS_SCROLL] (state, payload) {
    state['points'][payload.subject]['scroll'] = payload.height
  },
  [types.CAMERA_DEL] (state, index) {
    state.uploader.list.splice(index, 1)
  },
  [types.CAMERA_ADD] (state, data) {
    state.uploader.camera = ''
    state.uploader.list.push(data)
  },
  [types.CAMERA_PHOTO] (state, data) {
    state.uploader.camera = data
  },
  [types.CAMERA_UPLOAD] (state, data) {
    state.uploader = {
      camera: '',
      list: []
    }
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
