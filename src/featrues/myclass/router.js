

export default  {
  'class': {
    component:  r => require.ensure([], () => r(require('./pages/layout')), '/class'),
    subRoutes: {
      '/': {
        component: r => require.ensure([], () => r(require('./pages/index')), '/class/'),
      },
      '/add': {
        component: r => require.ensure([], () => r(require('./pages/add')), '/class/add'),
      },
      '/detail/:code': {
        component:  r => require.ensure([], () => r(require('./pages/classmate')), '/class/detail'),
      },
    }
  }
}


