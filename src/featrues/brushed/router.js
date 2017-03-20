export default {
  'brushed': {
    component: r => require.ensure([], () => r(require('./pages/layout')), '/brushed'),
    subRoutes: {
      '/': {
        component: r => require.ensure([], () => r(require('./pages/index')), '/brushed/'),
      },
      '/list/:chapterId': {
        component: r => require.ensure([], () => r(require('./pages/list')), '/brushed/list'),
      }
    }
  }
}

