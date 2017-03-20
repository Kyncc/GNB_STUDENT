export default {
  'brush': {
    component: r => require.ensure([], () => r(require('./pages/layout')), '/brush'),
    subRoutes: {
      '/': {
        component: r => require.ensure([], () => r(require('./pages/index')), '/brush/'),
      },
      '/list/:chapterId': {
        component: r => require.ensure([], () => r(require('./pages/list')), '/brush/list'),
      }
    }
  }
}
