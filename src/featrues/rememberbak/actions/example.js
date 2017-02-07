import Api from '../../../config/httpdispatch'
import * as types from '../mutationTypes'
import * as _ from '../../../config/whole'


/**获取例题信息 */
export const rememberExampleGet = ({ dispatch }, params,success) => {
  Api.rememberExampleGet({
      data:params,
      ok:response=>{
          dispatch(types.REMEMBER_EXAMPLE,response.data);
          success&&success();
      },
      wrong:response=>{
        _.toast(response.data.msg);
      }
  })
}

/**清空例题 */
export const rememberExampleClear = ({ dispatch }) => {
  dispatch(types.REMEMBER_EXAMPLE_CLEAR);
}

/**收藏例题 */
export const collectAdd = ({ dispatch },params,success) => {
  Api.collectAdd({
      data:params,
      ok:response=>{
        dispatch(types.REMEMBER_EXAMPLE_COLLECT_ADD);
        success&&success();
        _.toast('收藏成功');
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
        dispatch(types.REMEMBER_EXAMPLE_COLLECT_REMOVE);
        success&&success();
        _.toast('取消收藏成功');
      },
      wrong:response=>{
        _.toast(response.data.msg);
      }
  })
}
