import message from '../../featrues/message/router'
import modules from './modules/store'
import store from 'src/store'

export default {
  'interact': {
    component: r => require.ensure([], () => r(require('./pages/layout')), '/interact'),
    subRoutes: {
      '/':{component: r => require.ensure([], () => r(require('./pages/index')), '/interact/')},
      ...message
    }
  }
}

store.registerModule('interact', {
  ...modules
});