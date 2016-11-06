import Api from '../config/httpdispatch'
import * as types from './mutationTypes'
import * as _ from '../config/whole'

export const getReportChapter = ({ dispatch }, params, success,wrong) => {
  Api.reportChapter({
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

