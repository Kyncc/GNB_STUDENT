import layout from './pages/layout'
import index from './pages/index'
import settings from '../../featrues/settings/router'
import myClass from '../../featrues/myClass/router'
import userInfo from '../../user/pages/info'
// import photo from '../../main/pages/photo'

export default {
  'user': {
    component: layout,
    subRoutes: {
      '/':{component: index},
      'info':{component:userInfo},
      // 'photo':{component:photo},
      ...settings,
      ...myClass,
    }
  }
}
