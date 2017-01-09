import layout from './layout'
import index from './index'
import brush from '../../featrues/brush/router'
import remember from '../../featrues/remember/router'

export default {
  'index': {
    component: layout,
    subRoutes: {
      '/':{component: index},
      ...brush,
      ...remember,
    }
  }
}
