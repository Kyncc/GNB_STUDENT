import layout from './pages/layout'
import index from './pages/index'
import message from '../../featrues/message/router'
import modules from './modules/store'
import store from 'src/store'

export default {
  'interact': {
    component: layout,
    subRoutes: {
      '/':{component: index},
      ...message
    }
  }
}

store.registerModule('interact', {
  ...modules
});