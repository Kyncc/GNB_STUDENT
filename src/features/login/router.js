export default {
  path: '/login',
  component: r => require.ensure([], () => r(require('./pages/layout')), '/login'),
  children: [
    {
      path: '/',
      component: r => require.ensure([], () => r(require('./pages/login')), '/login/')
    },
    {
      path: '/forget',
      component: r => require.ensure([], () => r(require('./pages/forget')), '/forget')
    },
    {
      path: '/register',
      component: r => require.ensure([], () => r(require('./pages/register')), '/register')
    },
    {
      path: '/info',
      component: r => require.ensure([], () => r(require('./pages/info')), '/info')
    },
    {
      path: '/resetPassword',
      component: r => require.ensure([], () => r(require('./pages/resetPassword')), '/resetPassword')
    },
    {
      path: '/setPassword',
      component: r => require.ensure([], () => r(require('./pages/setPassword')), '/setPassword')
    }
  ]
}
