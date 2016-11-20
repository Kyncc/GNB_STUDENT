import Api from '../../config/httpdispatch'
import * as types from '../mutationTypes'
import * as _ from '../../config/whole'


/** 获取推荐例题列表*/
export const getErrorRecommendList = ({ dispatch }, params,success) => {
  Api.exerciseList({
    data: params,
    ok: response => {
      dispatch(types.GET_ERROR_RMDLIST, response.data);
      success&&success();
    },
    wrong: response => {
      _.toast(response.data.msg);
    }
  })
}


export const postErrorRecommend = ({ dispatch }, params, success) => {
  Api.errorRecommendPost({
    data: params,
    ok: response => {
      success();
    },
    wrong: response => {
      _.toast('提交失败');
    }
  })
}