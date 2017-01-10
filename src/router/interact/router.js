import layout from './pages/layout'
import index from './pages/index'
import message from '../../featrues/message/router'

export default {
  'interact': {
    component: layout,
    subRoutes: {
      '/':{component: index},
      ...message,
    }
  }
}
