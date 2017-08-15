export default {
  path: '/homework',
  component: r => require.ensure([], () => r(require('./pages/layout')), '/homework'),
  children: [
    {
      path: '/',
      name: 'homework',
      component: r => require.ensure([], () => r(require('./pages/index')), '/homework/index')
    }
  ]
}
