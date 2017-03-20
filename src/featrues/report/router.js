export default  {
  'report': {
    component: r => require.ensure([], () => r(require('./pages/layout')), '/report'),
    subRoutes: {
      '/': {
        component: r => require.ensure([], () => r(require('./pages/index')), '/report/'),
      },
      '/detail/:chapterId': {
        component:  r => require.ensure([], () => r(require('./pages/detail')), '/report/detail')
      }
    }
  }
}
