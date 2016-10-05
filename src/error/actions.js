import Api from '../config/httpdispatch'
import * as types from './mutationTypes'
import * as _ from '../config/whole'

export const getErrorIds = ({ dispatch }, params, success) => {
  Api.error({
    data: params,
    ok: response => {
      dispatch(types.GET_ERROR_INDEXIDS_SUCCESS, response.data);
      success&&success();
    },
    wrong: response => {
      dispatch(types.GET_ERROR_INDEXIDS_ERROR, response.data);
      _.toast(response.data.msg);
    }
  })
}

export const getErrorList = ({ dispatch }, params,success) => {
  Api.exerciseList({
    data: params,
    ok: response => {
      dispatch(types.GET_ERROR_INDEXLIST_SUCCESS, response.data);
      success&&success();
    },
    wrong: response => {
      dispatch(types.GET_ERROR_INDEXLIST_ERROR, response.data);
      _.toast(response.data.msg);
    }
  })
}

export const getErrorRecommendList = ({ dispatch }, params,success) => {
  Api.exerciseList({
    data: params,
    ok: response => {
      dispatch(types.GET_ERROR_RMDLIST_SUCCESS, response.data);
      success&&success();
    },
    wrong: response => {
      dispatch(types.GET_ERROR_RMDLIST_ERROR, response.data);
      _.toast(response.data.msg);
    }
  })
}

export const getErrorMoreList = ({ dispatch }, params,success) => {
  Api.exerciseList({
    data: params,
    ok: response => {
      dispatch(types.GET_ERROR_MORELIST_SUCCESS, response.data);
      success&&success();
    },
    wrong: response => {
      dispatch(types.GET_ERROR_MORELIST_ERROR, response.data);
      _.toast(response.data.msg);
    }
  })
}

export const getErrorMoreIds = ({ dispatch }, params, success,wrong) => {
  Api.errorMore({
    data: params,
    ok: response => {
      dispatch(types.GET_ERROR_MOREIDS_SUCCESS, response.data);
      success();
    },
    wrong: response => {
      dispatch(types.GET_ERROR_MOREIDS_ERROR, response.data);
      wrong();
    }
  })
}

export const getErrorRecommendIds = ({ dispatch }, params, success,wrong) => {
  Api.errorRecommend({
    data: params,
    ok: response => {
      dispatch(types.GET_ERROR_RMDIDS_SUCCESS, response.data);
      success();
    },
    wrong: response => {
      dispatch(types.GET_ERROR_RMDIDS_ERROR, response.data);
      wrong();
    }
  })
}

export const postErrorRecommend = ({ dispatch }, params, success) => {
  Api.errorRecommendPost({
    data: params,
    ok: response => {
      dispatch(types.POST_ERROR_RECOMMENDIDS_SUCCESS, response.data);
      success();
    },
    wrong: response => {
      dispatch(types.POST_ERROR_RECOMMENDIDS_ERROR, response.data);
      _.toast('提交失败');
    }
  })
}

export const getErrorListIds = ({ dispatch }, params, success,wrong) => {
  Api.errorList({
    data: params,
    ok: response => {
      dispatch(types.GET_ERROR_LISTIDS_SUCCESS, response.data);
      success&&success();
    },
    wrong: response => {
      dispatch(types.GET_ERROR_LISTIDS_ERROR, response.data);
      wrong&&wrong();
      _.toast(response.data.msg);
    }
  })
}


export const getErrorListList = ({ dispatch }, params, success,wrong) => {
  Api.cameraList({
    data: params,
    ok: response => {
      dispatch(types.GET_ERROR_LISTLIST_SUCCESS, response.data);
      success&&success();
    },
    wrong: response => {
      dispatch(types.GET_ERROR_LISTLIST_ERROR, response.data);
      _.toast(response.data.msg);
    }
  })
}
