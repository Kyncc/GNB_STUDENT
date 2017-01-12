import layout from './pages/layout'
import index from './pages/index'
import settings from '../../featrues/settings/router'
import myClass from '../../featrues/myClass/router'

export default {
  'user': {
    component: layout,
    subRoutes: {
      '/':{component: index},
      ...settings,
      ...myClass,
    }
  }
}
