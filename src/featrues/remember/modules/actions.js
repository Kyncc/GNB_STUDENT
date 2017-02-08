import axios from 'config/http'
import * as types from './mutationTypes'
import * as _ from 'config/whole'


/**获取练习册数据 */
export const getWorkbookStu = ({state,rootState,commit},params) => {
  console.log(state.subjectId);
  return new Promise((resolve, reject)=> { 
    axios({
      method:'get',
      url: 'workbook/student',
      params: {
        "token":rootState.login.token,
        "subjectId":state.subjectId
      }
    })
    .then((response) => {
      commit(types.WORKBOOK_STU,response.data.data)
      resolve(response);
    })
  });
}
/**练习册数据清空 */
export const workbookStuClear = ({ commit }) => {
  commit(types.WORKBOOK_STU_CLEAR);
}
/**切换科目 */
export const workbookStuSetSubject = ({ commit },id) => {
  commit(types.WORKBOOK_STU_SUBJECT_CHANGE,id);
  commit(types.WORKBOOK_STU_CLEAR);
}


/**获取练习册数据 */
export const getWorkbookStuPage = ({rootState,commit}) => {
  
  return new Promise((resolve, reject)=> { 
    axios({
      method:'get',
      url: 'workbook/student/page',
      params: {
        "token":rootState.login.token,
        "workbookId":rootState.route.params.workbookId
      }
    })
    .then((response) => {
      commit(types.WORKBOOK_STU_PAGE,response.data.data)
      resolve(response);
    })
  });
}
/**页码数据清空 */
export const workbookStuPageClear = ({ commit }) => {
  commit(types.WORKBOOK_STU_PAGE_CLEAR);
}
/**页码高度设置 */
export const setWorkbookStuPageScroll = ({ commit },height) => {
  commit(types.WORKBOOK_STU_PAGE_SCROLL,height);
}


/**获取练习册章节数据 */
export const getWorkbookStuChapter = ({state,rootState,commit}) => {
  return new Promise((resolve, reject)=> { 
    axios({
      method:'get',
      url: 'workbook/student/chapter',
      params: {
        "token":rootState.login.token,
        "workbookId":rootState.route.params.workbookId
      }
    })
    .then((response) => {
      commit(types.WORKBOOK_STU_CHAPTER,response.data.data)
      resolve(response);
    })
  });
}
/**章节数据清空 */
export const workbookStuChapterClear = ({ commit }) => {
  commit(types.WORKBOOK_STU_CHAPTER_CLEAR);
}
/**章节高度设置 */
export const setWorkbookStuChapterScroll = ({ commit },height) => {
  commit(types.WORKBOOK_STU_CHAPTER_SCROLL,height);
}


/**获取练习册章节数据 */
export const getWorkbookStuExercise = ({state,rootState,commit}) => {
  return new Promise((resolve, reject)=> { 
    axios({
      method:'get',
      url: 'workbook/student/exercise',
      params: {
        "token":rootState.login.token,
        "chapterId":rootState.route.params.chapterId
      }
    })
    .then((response) => {
      commit(types.WORKBOOK_STU_EXERCISE,response.data.data)
      resolve(response);
    })
  });
}
/** 练习数据清空 */
export const workbookStuExerciseClear = ({ commit }) => {
  commit(types.WORKBOOK_STU_EXERCISE_CLEAR);
}


