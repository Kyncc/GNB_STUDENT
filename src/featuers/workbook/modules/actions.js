import Vue from 'vue'
import axios from '@/components/axios/'
import * as types from './mutationTypes'

/** 获取练习册数据 */
export const getWorkbookStu = ({state, rootState, commit}, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'workbook',
      params: {
        'token': rootState.common.user.token,
        'subjectId': state.subjectId,
        'textbookId': state.textbookId
      }
    })
    .then((response) => {
      commit(types.WORKBOOK_STU, response.data.data)
      resolve(response)
    })
  })
}

/** 练习册数据清空 */
export const workbookStuClear = ({ commit }) => {
  commit(types.WORKBOOK_STU_CLEAR)
}

/** 切换科目 */
export const workbookStuSetSubject = ({ commit }, id) => {
  commit(types.WORKBOOK_STU_SUBJECT_CHANGE, id)
  commit(types.WORKBOOK_STU_CLEAR)
}

/** 获取练习册章节数据 */
export const getWorkbookStuChapter = ({state, rootState, commit}) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'remember/chapter',
      params: {
        'token': rootState.common.user.token,
        'workbookId': rootState.route.params.workbookId
      }
    })
    .then((response) => {
      commit(types.WORKBOOK_STU_CHAPTER, response.data.data)
      resolve(response)
    })
  })
}

/** 提交章节练习题 */
export const WorkbookExercisePost = ({state, rootState, commit}, params) => {
  Vue.$vux.loading.show({text: '请稍候'})
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'remember/submit',
      data: {
        'answer': params.answer,
        'answerId': params.answerId,
        'token': rootState.common.user.token,
        'chapterId': rootState.route.params.chapterId
      }
    })
    .then((response) => {
      Vue.$vux.loading.hide()
      Vue.$vux.toast.show({text: '提交成功', type: 'text', time: 1000, position: 'bottom'})
      commit(types.WORKBOOK_STU_EXERCISE_POST, response.data.data)
      commit(types.WORKBOOK_STU_CHAPTER_CLEAR)
      resolve(response)
    })
    .catch((response) => {
      Vue.$vux.loading.hide()
    })
  })
}

/** 章节数据清空 */
export const workbookStuChapterClear = ({ commit }) => {
  commit(types.WORKBOOK_STU_CHAPTER_CLEAR)
}

/** 章节高度设置 */
export const setWorkbookStuChapterScroll = ({ commit }, height) => {
  commit(types.WORKBOOK_STU_CHAPTER_SCROLL, height)
}

/** 获取练习册章节数据 */
export const getWorkbookStuExercise = ({state, rootState, commit}, id) => {
  Vue.$vux.loading.show({text: '请稍候'})
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'remember/exercises',
      params: {
        'token': rootState.common.user.token,
        'chapterId': rootState.route.params.chapterId || id
      }
    })
    .then((response) => {
      Vue.$vux.loading.hide()
      commit(types.WORKBOOK_STU_EXERCISE, response.data.data)
      resolve(response)
    })
    .catch((response) => {
      Vue.$vux.loading.hide()
    })
  })
}

/**  练习数据清空 */
export const workbookStuExerciseClear = ({ commit }) => {
  commit(types.WORKBOOK_STU_EXERCISE_CLEAR)
}

/** 章节练习题答案变更 */
export const workbookStuExAnswerChange = ({ commit }, params) => {
  commit(types.WORKBOOK_STU_EXERCISE_CHANGE, params)
}

/** 练习题目高度设置 */
export const setWorkbookStuExersciseScroll = ({ commit }, height) => {
  commit(types.WORKBOOK_STU_EXERCISE_SCROLL, height)
}


/**  上传照片删除 */
export const workbookStuUploadDel = ({ commit }, id) => {
  commit(types.WORKBOOK_STU_UPLOAD_DEL, id)
}

/**  上传照片增加 */
export const workbookStuUploadAdd = ({ commit }, data) => {
  commit(types.WORKBOOK_STU_UPLOAD_ADD, data)
}

/**  照片增加 */
export const workbookStuCamera = ({ commit }, data) => {
  commit(types.WORKBOOK_STU_UPLOAD_CAMERA, data)
}

/**  上传照片 */
export const workbookStuUpload = ({state, rootState, commit}) => {
  Vue.$vux.loading.show({text: '请稍候'})
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'remember/uploadHomeWork/',
      data: {
        'token': rootState.common.user.token,
        'cameraList': state.uploader.list,
        'chapterId': rootState.route.params.chapterId
      }
    })
    .then((response) => {
      commit(types.WORKBOOK_STU_UPLOAD, response.data.data)
      resolve(response)
      Vue.$vux.loading.hide()
    })
    .catch((response) => {
      Vue.$vux.loading.hide()
    })
  })
}

