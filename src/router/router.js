export default {
  path: '/',
  component: r => require.ensure([], () => r(require('./pages/layout')), '/'),
  children: [
    {
      path: '/',
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
}
