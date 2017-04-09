export default {
  path: '/settings',
  component: r => require.ensure([], () => r(require('./pages/layout')), '/settings'),
  children: [
    {
      path: '/',
      component: r => require.ensure([], () => r(require('./pages/index')), '/settings/')
    },
    {
      path: 'info',
      component: r => require.ensure([], () => r(require('./pages/info')), '/settings/info')
    },
    {
      path: 'update',
      component: r => require.ensure([], () => r(require('./pages/update')), '/settings/update')
    },
    {
      path: 'photo',
      component: r => require.ensure([], () => r(require('./pages/photo')), '/settings/photo')
    },
    {
      path: 'resetPwd',
      component: r => require.ensure([], () => r(require('./pages/resetPwd')), '/settings/resetPwd')
    }
  ]
}
