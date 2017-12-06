export default {
  path: '/login',
  component: r => require.ensure([], () => r(require('./pages/layout')), 'login/layout'),
  children: [
    {
      path: '/',
      component: r => require.ensure([], () => r(require('./pages/login')), 'login/index')
    },
    {
      path: '/forget',
      component: r => require.ensure([], () => r(require('./pages/forget')), 'login/forget')
    },
    {
      path: '/register',
      component: r => require.ensure([], () => r(require('./pages/register')), 'login/register')
    },
    {
      path: '/info',
      component: r => require.ensure([], () => r(require('./pages/info')), 'login/info')
    },
    {
      path: '/resetPassword',
      component: r => require.ensure([], () => r(require('./pages/resetPassword')), 'login/resetPassword')
    },
    {
      path: '/setPassword',
      component: r => require.ensure([], () => r(require('./pages/setPassword')), 'login/setPassword')
    }
  ]
}
