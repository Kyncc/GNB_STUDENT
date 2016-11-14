import Api from '../../config/httpdispatch'
import * as types from '../mutationTypes'
import * as _ from '../../config/whole'


/**获取章节练习题 */
export const getChapterDetail = ({ dispatch }, params,success,wrong) => {
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