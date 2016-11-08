import Api from '../../config/httpdispatch'
import * as types from '../mutationTypes'
import * as _ from '../../config/whole'


/**我的信息 */
export const getUserinfo = ({ dispatch }, params,success,wrong) => {
  Api.getUserInfo({
    data: params,
    ok: response => {
      dispatch(types.USERINFO_GET, response.data.data);
      success&&success();
    },
    wrong: response => {
      wrong&&wrong();
      _.toast(response.data.msg);
    }
  })
}

/**编辑用户信息 */
export const updateUserinfo = ({ dispatch }, params,success,wrong) => {
  Api.updateUserInfo({
    data: params,
    ok: response => {
      dispatch(types.USERINFO_UPDATE, response.data.data);
      success&&success();
    },
    wrong: response => {
      wrong&&wrong();
      _.toast(response.data.msg);
    }
  })
}

/**获得教材版本信息 */
export const getTextbookVersion = ({ dispatch }, params,success,wrong) => {
  Api.getTextbookVer({
    data: params,
    ok: response => {
      dispatch(types.USERINFO_TEXTBOOKVERSION, response.data.data);
      success&&success();
    },
    wrong: response => {
      wrong&&wrong();
      _.toast(response.data.msg);
    }
  })
}


