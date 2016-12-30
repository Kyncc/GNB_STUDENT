import Api from '../config/httpdispatch'
import * as types from './mutationTypes'
import * as _ from '../config/whole'

export const getErrorList = ({ dispatch }, params,success) => {
  Api.exerciseList({
    data: params,
    ok: response => {
      dispatch(types.GET_ERROR_INDEXLIST, response.data);
      success&&success();
    },
    wrong: response => {
      _.toast(response.data.msg);
    }
  })
}


export const getErrorMoreList = ({ dispatch }, params,success) => {
  Api.exerciseList({
    data: params,
    ok: response => {
      dispatch(types.GET_ERROR_MORELIST, response.data);
      success&&success();
    },
    wrong: response => {
      _.toast(response.data.msg);
    }
  })
}

export const getErrorMoreIds = ({ dispatch }, params, success,wrong) => {
  Api.errorMore({
    data: params,
    ok: response => {
      dispatch(types.GET_ERROR_MOREIDS, response.data);
      success();
    },
    wrong: response => {
      wrong();
    }
  })
}

export const getErrorRecommendIds = ({ dispatch }, params, success,wrong) => {
  Api.errorRecommend({
    data: params,
    ok: response => {
      dispatch(types.GET_ERROR_RMDIDS, response.data);
      success();
    },
    wrong: response => {
      wrong();
    }
  })
}


export const getErrorListIds = ({ dispatch }, params, success,wrong) => {
  Api.errorList({
    data: params,
    ok: response => {
      dispatch(types.GET_ERROR_LISTIDS, response.data);
      success&&success();
    },
    wrong: response => {
      wrong&&wrong();
      _.toast(response.data.msg);
    }
  })
}


export const getErrorListList = ({ dispatch }, params, success,wrong) => {
  Api.cameraList({
    data: params,
    ok: response => {
      dispatch(types.GET_ERROR_LISTLIST, response.data);
      success&&success();
    },
    wrong: response => {
      _.toast(response.data.msg);
    }
  })
}


