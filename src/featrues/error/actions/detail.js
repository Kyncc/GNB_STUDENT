import Api from '../../config/httpdispatch'
import * as types from '../mutationTypes'
import * as _ from '../../config/whole'

/**获取详情 */
export const getErrorDetail = ({ dispatch }, params,success) => {
  Api.exerciseList({
    data: params,
    ok: response => {
      dispatch(types.ERROR_INDEXDETAIL, response.data);
      success&&success();
    },
    wrong: response => {
      _.toast(response.data.msg);
    }
  })
}

/**获取推荐例题 */
export const getErrorRecommendList = ({ dispatch }, params,success) => {
  _.busy();
  Api.exerciseList({
    data: params,
    ok: response => {
      dispatch(types.GET_ERROR_RMDLIST, response.data);
      success&&success();
      _.leave();
    },
    wrong: response => {
      _.leave();
      _.toast(response.data.msg);
    }
  })
}
