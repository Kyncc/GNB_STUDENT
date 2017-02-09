import layout from './pages/layout'
import index from './pages/index'
import photo from './pages/photo'
import myClass from '../../featrues/myclass/router'
import settings from '../../featrues/settings/router'
import modules from './modules/store'
import store from 'src/store'

export default {
  'user': {
    component: layout,
    subRoutes: {
      '/':{component: index},
      'photo':{component:photo},
      ...settings,
      ...myClass
    }
  }
}

store.registerModule('user', {
  ...modules
});