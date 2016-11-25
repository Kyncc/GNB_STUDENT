import Api from '../../config/httpdispatch'
import * as types from '../mutationTypes'
import * as _ from '../../config/whole'

/**我的习题册 */
export const getWorkbook = ({ dispatch }, params,success,wrong) => {
  Api.workbook({
    data: params,
    ok: response => {
      dispatch(types.WORKBOOK_GET, response.data.data);
      success&&success();
    },
    wrong: response => {
      wrong&&wrong();
      _.toast(response.data.msg);
    }
  })
}

/**全部习题册 */
export const getWorkbookAll = ({ dispatch }, params,success,wrong) => {
  Api.workbookList({
    data: params,
    ok: response => {
      dispatch(types.WORKBOOK_GET_ALL, response.data.data);
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
    dispatch(types.WORKBOOK_SUBJECT_CHANGE,id);
}


/**删除习题册 */
export const delWorkbook = ({ dispatch }, params,success,wrong) => {
  Api.workbookDel({
    data: params,
    ok: response => {
      dispatch(types.WORKBOOK_DEL, response.data.data);
      success&&success();
    },
    wrong: response => {
      wrong&&wrong();
      _.toast(response.data.msg);
    }
  })
}

/**增加习题册 */
export const addWorkbook = ({ dispatch }, params,success,wrong) => {
  _.busy();
  Api.workbookAdd({
    data: params,
    ok: response => {
      dispatch(types.WORKBOOK_ADD);
      _.leave();
      success&&success();
    },
    wrong: response => {
      wrong&&wrong();
      _.leave();
      _.toast(response.data.msg);
    }
  })
}

/**全部练习册数据清空 */
export const workbookAllDel = ({ dispatch }) => {
  dispatch(types.WORKBOOK_RELOAD);
}

