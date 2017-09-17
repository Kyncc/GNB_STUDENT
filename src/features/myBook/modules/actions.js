import Vue from 'vue'
import axios from '@/components/axios/'
import * as types from './mutationTypes'

/** 获取练习册数据 */
export const getMyBook = ({ state, rootState, commit }, params) => {
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
        commit(types.MYBOOK, { 'subject': subject, 'data': response.data.data })
        resolve(response)
      })
  })
}

/** 习题册列表 */
export const getMyBookAdd = ({ rootState, commit, state }, params) => {
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
        commit(types.MYBOOK_LIST, { data: response.data.data })
        resolve(response)
      })
  })
}

/** 习题册增加 */
export const myBookAdd = ({ rootState, commit, state }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'workbook/update',
      data: {
        token: rootState.common.user.token,
        type: 'add',
        myBookId: params.myBookId
      }
    })
      .then((response) => {
        commit(types.MYBOOK_ADD, { type: params.type, pindex: params.pindex, index: params.index })
        Vue.$vux.toast.show({ text: '增加习题册成功', type: 'success', isShowMask: true, time: 1500 })
        resolve(response)
      })
  })
}

/** 习题册删除 */
export const myBookDel = ({ rootState, commit, state }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'workbook/update',
      data: {
        token: rootState.common.user.token,
        type: 'del',
        myBookId: params.myBookId
      }
    })
      .then((response) => {
        commit(types.MYBOOK_DEL, { type: params.type, pindex: params.pindex, index: params.index })
        Vue.$vux.toast.show({ text: '删除习题册成功', type: 'success', isShowMask: true, time: 1500 })
        resolve(response)
      })
  })
}

/** 搜索习题册列表 */
export const getMyBookSearch = ({ rootState, commit, state }, params) => {
  let subjectId = (rootState.route.params.subject.indexOf('math') !== -1 ? 2 : 7)
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'workbook/list',
      params: {
        token: rootState.common.user.token,
        subjectId: subjectId,
        myBookName: params.myBookName
      }
    })
      .then((response) => {
        commit(types.MYBOOK_SEARCH, { data: response.data.data })
        resolve(response)
      })
  })
}

/** 练习册数据清空 */
export const myBookAddClear = ({ commit }) => {
  commit(types.MYBOOK_LIST_CLEAR)
}

/** 搜索数据清空 */
export const myBookSearchClear = ({ commit }) => {
  commit(types.MYBOOK_SEARCH_CLEAR)
}

/** 练习册数据清空 */
export const myBookClear = ({ rootState, commit }) => {
  let subject = (rootState.route.name.indexOf('math') !== -1 ? 'math' : 'physics')
  commit(types.MYBOOK_CLEAR, { 'subject': subject })
}

/** 练习册章节高度设置 */
export const setMyBookScroll = ({ rootState, commit }, height) => {
  let subject = (rootState.route.name.indexOf('math') !== -1 ? 'math' : 'physics')
  commit(types.MYBOOK_SCROLL, { subject: subject, height: height })
}

/** 想要练习册照片删除 */
export const myBookWantDel = ({ commit }, type) => {
  commit(types.MYBOOK_WANT_DEL, type)
}

/** 提交想要练习册图片 */
export const myBookWantAdd = ({ commit }, data) => {
  commit(types.MYBOOK_WANT_ADD, {type: data.type, data: data.data})
}

/** 想要练习册照片拍照 */
export const myBookWantCamera = ({ commit }, data) => {
  commit(types.MYBOOK_WANT_CAMERA, data)
}

/** 想要练习册照片增加 */
export const myBookWantUpload = ({ state, rootState, commit }) => {
  Vue.$vux.loading.show({ text: '请稍候' })
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'workbook/want',
      data: {
        'index': state.myBook.want.index,
        'version': state.myBook.want.version,
        'token': rootState.common.user.token
      }
    })
      .then((response) => {
        Vue.$vux.loading.hide()
        Vue.$vux.toast.show({ text: '提交成功', type: 'success', isShowMask: true, time: 1500 })
        commit(types.MYBOOK_WANT_UPLOAD)
        resolve(response)
      })
      .catch((error) => {
        Vue.$vux.loading.hide()
        reject(error)
      })
  })
}
