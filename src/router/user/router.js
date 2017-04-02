import myClass from '../../featrues/myclass/router'
import settings from '../../featrues/settings/router'

export default {
  'user': {
    component: r => require.ensure([], () => r(require('./pages/layout')), '/user'),
    subRoutes: {
      '/':{component: r => require.ensure([], () => r(require('./pages/index')), '/user/')},
      'photo':{component:r => require.ensure([], () => r(require('./pages/photo')), '/user/photo')},
      ...settings,
      ...myClass
    }
  }
}