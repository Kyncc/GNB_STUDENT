import Api from '../../../config/httpdispatch'
import * as types from '../mutationTypes'
import * as _ from '../../../config/whole'

//获取班级列表
export const getMyClass = ({ dispatch }, params,success,wrong) => {
  Api.myClassList({
    data: params,
    ok: response => {
      dispatch(types.CLASS_MY_GET, response.data.data);
      success&&success();
    },
    wrong: response => {
      wrong&&wrong();
      _.toast(response.data.msg);
    }
  })
}

//获取班级同学列表
export const getMyClassmateList = ({ dispatch }, params,success,wrong) => {
  Api.myClassmateList({
    data: params,
    ok: response => {
      dispatch(types.CLASS_MYCLASSMATE_GET, response.data.data);
       success&&success();
    },
    wrong: response => {
       wrong&&wrong();
        _.toast(response.data.msg);
    }
  })
}

//获取班级码查找
export const getMyClassSearchClass = ({ dispatch }, params,success,wrong) => {
  Api.myClassSearch({
    data: params,
    ok: response => {
      dispatch(types.CLASS_SEARCH, response.data.data);
      success&&success();
    },
    wrong: response => {
      wrong&&wrong();
      _.toast(response.data.msg);
    }
  })
}

//加入班级
export const postMyClassInto = ({ dispatch }, params,success,wrong) => {
  Api.myClassInto({
    data: params,
    ok: response => {
      dispatch(types.CLASS_ADD);
      success&&success();
    },
    wrong: response => {
      wrong&&wrong();
      _.toast(response.data.msg);
    }
  })
}