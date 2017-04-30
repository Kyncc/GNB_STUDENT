export default {
  path: '/',
  component: r => require.ensure([], () => r(require('./pages/layout')), '/'),
  redirect: to => {
    if (localStorage.getItem('token') === 'undefined') return 'login'
    return 'index'
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
}
