import Api from '../config/httpdispatch'
import * as types from './mutationTypes'
import * as _ from '../config/whole'

export const getReport = ({ dispatch }, params, success,wrong) => {
  Api.report({
    data: params,
    ok: response => {
       dispatch(types.GET_REPORT_CHAPTER_SUCCESS, response.data);

       success&&success();
    },
    wrong: response => {
        _.toast(response.data.msg);
        wrong&&wrong();
    }
  })
}

/**手风琴的打开关闭 */
export const changeChapter = ({ dispatch },index) => {
    dispatch(types.CHAPTER_STATE_CHANGE,index);
}

/**浏览器高度 */
export const setScoll = ({ dispatch },height) => {
    dispatch(types.REPORT_SCOLLER_HEIGHT,height);
}

export const getReportDetail = ({ dispatch }, params, success,wrong) => {
  Api.reportDetail({
    data: params,
    ok: response => {
       dispatch(types.GET_REPORT_DETAIL_SUCCESS, response.data);
       success&&success();
    },
    wrong: response => {
        _.toast(response.data.msg);
        wrong&&wrong();
    }
  })
}


export const changeSubject = ({ dispatch }, params, success,wrong) => {
  Api.reportChapter({
    data: params,
    ok: response => {
       dispatch(types.REPORT_CHANGE_SUBJECT, response.data);
       success&&success();
    },
    wrong: response => {
        _.toast(response.data.msg);
        wrong&&wrong();
    }
  })
}

