import Api from '../../../config/httpdispatch'
import * as _ from '../../../config/whole'
import * as types from '../mutationTypes'

/**获取收藏习题详情 */
export const getCollectExampleDetail = ({ dispatch }, params,success,wrong) => {
  Api.exerciseList({
    data:params,
    ok:response=>{
      dispatch(types.COLLECT_EXAMPLEDETAIL,response.data);
      success&&success();
    },
    wrong:response=>{
      _.toast(response.data.msg);
    }
  })
}

/**取消例题 */
export const collectRemove = ({ dispatch },params,success) => {
  Api.collectRemove({
    data:params,
    ok:response=>{
      // dispatch(types.COLLECT_EXAMPLE_COLLECT_REMOVE);
      success&&success();
      _.toast('取消收藏成功');
    },
    wrong:response=>{
      _.toast(response.data.msg);
    }
  })
}
