import Api from '../../config/httpdispatch'
import * as _ from '../../config/whole'
import * as types from './mutationTypes'

/**我的教材 */
export const getTextbook = ({ dispatch }, params,success,wrong) => {
  Api.textbook({
    data: params,
    ok: response => {
      dispatch(types.TEXTBOOK_GET, response.data.data);
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
    dispatch(types.TEXTBOOK_SUBJECT_CHANGE,id);
}

/**全部教材 */
export const getTextbookAll = ({ dispatch }, params,success,wrong) => {
  Api.textbookList({
    data: params,
    ok: response => {
      dispatch(types.TEXTBOOK_GET_ALL, response.data.data);
       success&&success();
    },
    wrong: response => {
       wrong&&wrong();
        _.toast(response.data.msg);
    }
  })
}

/**删除教材 */
export const delTextbook = ({ dispatch }, params,success,wrong) => {
  Api.textbookDel({
    data: params,
    ok: response => {
      dispatch(types.TEXTBOOK_DEL, response.data.data);
      success&&success();
    },
    wrong: response => {
      wrong&&wrong();
      _.toast(response.data.msg);
    }
  })
}

/**增加教材 */
export const addTextbook = ({ dispatch }, params,success,wrong) => {
  _.busy();
  Api.textbookAdd({
    data: params,
    ok: response => {
      dispatch(types.TEXTBOOK_ADD);
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

/**全部教材数据清空 */
export const textbookAllDel = ({ dispatch }) => {
  dispatch(types.TEXTBOOK_RELOAD);
}

