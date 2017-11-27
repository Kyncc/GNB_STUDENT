export default {
  path: '/homework',
  component: r => require.ensure([], () => r(require('./pages/layout')), 'homework/layout'),
  children: [
    {
      path: '/',
      name: 'homework',
      component: r => require.ensure([], () => r(require('./pages/index')), 'homework/index')
    }
  ]
}
