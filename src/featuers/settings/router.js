export default {
  path: '/settings',
  component: r => require.ensure([], () => r(require('./pages/layout')), '/settings'),
  children: [
    {
      path: '/',
      component: r => require.ensure([], () => r(require('./pages/index')), '/settings/')
    },
    {
      path: 'resetPwd',
      component: r => require.ensure([], () => r(require('./pages/resetPwd')), '/settings/resetPwd')
    }
  ]
}
