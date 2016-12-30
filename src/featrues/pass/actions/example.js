import Api from '../../../config/httpdispatch'
import * as _ from '../../../config/whole'
import * as types from '../mutationTypes'
import {COLLECT_RELOAD} from '../../collect/mutationTypes'

/**获取例题信息 */
export const getPassExample = ({ dispatch }, params,success) => {
  Api.exerciseList({
      data:params,
      ok:response=>{
          dispatch(types.PASS_EXAMPLE,response.data);
          success&&success();
      },
      wrong:response=>{
        _.toast(response.data.msg);
      }
  })
}

/**清空例题 */
export const passExampleClear = ({ dispatch }) => {
  dispatch(types.PASS_EXAMPLE_CLEAR);
}

/**收藏例题 */
export const collectAdd = ({ dispatch },params,success) => {
  Api.collectAdd({
      data:params,
      ok:response=>{
        dispatch(types.PASS_EXAMPLE_COLLECT_ADD);
        dispatch(COLLECT_RELOAD); //收藏数据的清空
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
        dispatch(types.PASS_EXAMPLE_COLLECT_REMOVE);
        dispatch(COLLECT_RELOAD);//收藏数据的清空
        success&&success();
        _.toast('取消收藏成功');
      },
      wrong:response=>{
        _.toast(response.data.msg);
      }
  })
}

