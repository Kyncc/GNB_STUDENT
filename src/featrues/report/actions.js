import Api from '../../config/httpdispatch'
import * as types from './mutationTypes'
import * as _ from '../../config/whole'

/**获取章节数据 */
export const getReport = ({ dispatch }, params, success,wrong) => {
  Api.report({
    data: params,
    ok: response => {
       dispatch(types.REPORT_CHAPTER, response.data);
       success&&success();
    },
    wrong: response => {
        _.toast(response.data.msg);
        wrong&&wrong();
    }
  })
}

/**获取详细报表 */
export const getReportDetail = ({ dispatch }, params, success,wrong) => {
  Api.reportDetail({
    data: params,
    ok: response => {
       dispatch(types.REPORT_DETAIL, response.data);
       success&&success();
    },
    wrong: response => {
        _.toast(response.data.msg);
        wrong&&wrong();
    }
  })
}

/**索引对应手风琴的打开关闭 */
export const changeChapter = ({ dispatch },index) => {
    dispatch(types.CHAPTER_STATE_CHANGE,index);
}

/**浏览器高度 */
export const setScoll = ({ dispatch },height) => {
    dispatch(types.REPORT_SCOLLER_HEIGHT,height);
}

/**清除章节数据 */
export const clearReport = ({ dispatch }) => {
    dispatch(types.CLEAR_REPORT_CHAPTER);
}

/**清除报告单数据 */
export const clearDetail = ({ dispatch }) => {
    dispatch(types.CLEAR_REPORT_DETAIL);
}

/**更换科目 */
export const setSubject = ({ dispatch }, id) => {
    dispatch(types.REPORT_CHANGE_SUBJECT,id);
    dispatch(types.CLEAR_REPORT_CHAPTER);
}

