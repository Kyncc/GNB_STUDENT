import message from '../../featrues/message/router'

export default {
  'interact': {
    component: r => require.ensure([], () => r(require('./pages/layout')), '/interact'),
    subRoutes: {
      '/':{component: r => require.ensure([], () => r(require('./pages/index')), '/interact/')},
      ...message
    }
  }
}

