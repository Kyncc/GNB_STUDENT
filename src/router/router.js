export default [
  {
    path: '/',
    component: r => require.ensure([], () => r(require('./pages/layout')), '/'),
    redirect: to => {
      if (localStorage.getItem('token')) return 'index'
      return 'login'
    },
    children: [
      {
        path: 'index',
        name: 'index',
        component: r => require.ensure([], () => r(require('./pages/index')), '/index')
      },
      {
        path: 'bag',
        name: 'bag',
        component: r => require.ensure([], () => r(require('./pages/bag')), '/bag')
      },
      {
        path: 'user',
        name: 'user',
        component: r => require.ensure([], () => r(require('./pages/user')), '/user')
      }
    ]
  },
  {
    path: '/article/:id',
    component: r => require.ensure([], () => r(require('./pages/article')), '/article')
  }
]
