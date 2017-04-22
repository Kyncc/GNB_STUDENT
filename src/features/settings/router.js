export default {
  path: '/settings',
  component: r => require.ensure([], () => r(require('./pages/layout')), '/settings'),
  children: [
    {
      path: '/',
      name: 'settings',
      component: r => require.ensure([], () => r(require('./pages/index')), '/settings/')
    },
    {
      path: 'info',
      name: 'settings_info',
      component: r => require.ensure([], () => r(require('./pages/info')), '/settings/info')
    },
    {
      path: 'update',
      name: 'settings_update',
      component: r => require.ensure([], () => r(require('./pages/update')), '/settings/update')
    },
    {
      path: 'photo',
      name: 'settings_photo',
      component: r => require.ensure([], () => r(require('./pages/photo')), '/settings/photo')
    },
    {
      path: 'resetPwd',
      name: 'settings_pwd',
      component: r => require.ensure([], () => r(require('./pages/resetPwd')), '/settings/resetPwd')
    }
  ]
}
