import Api from '../config/httpdispatch'
import * as types from './mutationTypes'
import * as _ from '../config/whole'

export const getErrorIds = ({ dispatch }, params, callback) => {
  Api.error({
    data: params,
    ok: response => {
      dispatch(types.GET_ERROR_INDEXIDS_SUCCESS, response.data);
    },
    wrong: response => {
      dispatch(types.GET_ERROR_INDEXIDS_ERROR, response.data);
      _.toast(response.data.msg);
    }
  })
}

export const getErrorList = ({ dispatch }, params) => {
  Api.exerciseList({
    data: params,
    ok: response => {
      dispatch(types.GET_ERROR_INDEXLIST_SUCCESS, response.data);
    },
    wrong: response => {
      dispatch(types.GET_ERROR_INDEXLIST_ERROR, response.data);
      _.toast(response.msg);
    }
  })
}

export const getErrorMoreIds = ({ dispatch }, params, callback) => {
  Api.errorMore({
    data: params,
    ok: response => {
      dispatch(types.GET_ERROR_MOREIDS_SUCCESS, response.data);
    },
    wrong: response => {
      dispatch(types.GET_ERROR_MOREIDS_ERROR, response.data);
      _.toast(response.data.msg);
    }
  })
}

export const getErrorMoreList = ({ dispatch }, params, callback) => {
  Api.cameraList({
    data: params,
    ok: response => {
      dispatch(types.GET_ERROR_MORELIST_SUCCESS, response.data);
      callback();
    },
    wrong: response => {
      dispatch(types.GET_ERROR_MORELIST_ERROR, response.data);
      _.toast(response.data.msg);
    }
  })
}


export const getErrorRecommendIds = ({ dispatch }, params, callback) => {
  Api.errorRecommend({
    data: params,
    ok: response => {
      dispatch(types.GET_ERROR_RECOMMENDIDS_SUCCESS, response.data);
    },
    wrong: response => {
      dispatch(types.GET_ERROR_RECOMMENDIDS_SERROR, response.data);
      _.toast(response.data.msg);
    }
  })
}

export const getErrorRecommendList = ({ dispatch }, params, callback) => {
  Api.exerciseList({
    data: params,
    ok: response => {
      dispatch(types.GET_ERROR_RECOMMENDLIST_SUCCESS, response.data);
    },
    wrong: response => {
      dispatch(types.GET_ERROR_RECOMMENDLIST_SERROR, response.data);
      _.toast(response.data.msg);
    }
  })
}


export const postErrorRecommend = ({ dispatch }, params, callback) => {
  Api.errorRecommendPost({
    data: params,
    ok: response => {
      dispatch(types.POST_ERROR_RECOMMENDIDS_SUCCESS, response.data);
    },
    wrong: response => {
      dispatch(types.POST_ERROR_RECOMMENDIDS_ERROR, response.data);
      _.toast(response.data.msg);
    }
  })
}

export const getErrorListIds = ({ dispatch }, params, callback) => {
  Api.errorList({
    data: params,
    ok: response => {
      dispatch(types.GET_ERROR_LISTIDS_SUCCESS, response.data);
    },
    wrong: response => {
      dispatch(types.GET_ERROR_LISTIDS_ERROR, response.data);
      _.toast(response.data.msg);
    }
  })
}


export const getErrorListList = ({ dispatch }, params, callback) => {
  Api.exerciseList({
    data: params,
    ok: response => {
      dispatch(types.GET_ERROR_LISTLIST_SUCCESS, response.data);
    },
    wrong: response => {
      dispatch(types.GET_ERROR_LISTLIST_ERROR, response.data);
      _.toast(response.data.msg);
    }
  })
}
