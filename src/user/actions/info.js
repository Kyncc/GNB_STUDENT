import Api from '../../config/httpdispatch'

import {GET_INFO} from '../../main/mutationTypes'


import * as types from '../mutationTypes'
import * as _ from '../../config/whole'


/**我的信息 */
export const getUserinfo = ({ dispatch }, params,success,wrong) => {
  //  _.busy();
  Api.getUserInfo({
    data: params,
    ok: response => {
      dispatch(types.USERINFO_GET, response.data.data);

      //  _.leave();
      success&&success();
    },
    wrong: response => {
      wrong&&wrong();
       _.leave();
      _.toast(response.data.msg);
    }
  })
}

/**编辑用户信息 */
export const updateUserinfo = ({ dispatch }, params,success,wrong) => {
  _.busy();
  Api.updateUserInfo({
    data: params,
    ok: response => {
      success&&success();
       _.leave();
       _.toast('修改成功！');
    },
    wrong: response => {
      wrong&&wrong();
       _.leave();
      _.toast(response.data.msg);
    }
  })
}

/**获得教材版本信息 */
export const getTextbookVersion = ({ dispatch }, params,success,wrong) => {
  _.busy();
  Api.getTextbookVer({
    data: params,
    ok: response => {
      _.leave();
      dispatch(types.USERINFO_TEXTBOOKVERSION, response.data.data);
      success&&success();
    },
    wrong: response => {
      _.leave();
      wrong&&wrong();
      _.toast(response.data.msg);
    }
  })
}


