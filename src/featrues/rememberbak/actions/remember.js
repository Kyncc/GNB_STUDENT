import Api from '../../../config/httpdispatch'
import * as types from '../mutationTypes'
import * as _ from '../../../config/whole'

/**我的习题册 */
export const getWorkbook = ({ dispatch }, params,success,wrong) => {
  dispatch(types.REMEMBER_CHAPTER_CLEAR);
  Api.workbook({
    data: params,
    ok: response => {
      dispatch(types.REMEMBER_WORKBOOK_GET, response.data);
      success&&success();
    },
    wrong: response => {
      wrong&&wrong();
      _.toast(response.data.msg);
    }
  })
}

/**更换科目 */
export const setSubject = ({ dispatch }, id) => {
    dispatch(types.REMEMBER_SUBJECT_CHANGE,id);
}


/**清楚页数和章节的数据 */
export const delChapter = ({ dispatch }) => {
    dispatch(types.REMEMBER_PAGE_CLEAR);
    dispatch(types.REMEMBER_CHAPTER_CLEAR);
}

