import brush from '../../featrues/brush/router'
import remember from '../../featrues/remember/router'

export default {
  'index': {
    component: r => require.ensure([], () => r(require('./pages/layout')), '/index'),
    subRoutes: {
      '/':{component: r => require.ensure([], () => r(require('./pages/index')), '/index/')},
      ...brush,
      ...remember
    }
  }
}
