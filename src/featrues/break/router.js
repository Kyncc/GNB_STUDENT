export default {
  '/break': {
    component: r => require.ensure([], () => r(require('./pages/layout')), '/break'),
    subRoutes: {
      '/': {
        component: r => require.ensure([], () => r(require('./pages/index')), '/break/'),
      },
      '/list/:chapterId': {
        component:  r => require.ensure([], () => r(require('./pages/list')), '/break/list'),
      }
    }
  }
}