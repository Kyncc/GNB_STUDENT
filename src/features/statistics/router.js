export default {
  path: '/statistics',
  component: r => require.ensure([], () => r(require('./pages/layout')), '/statistics'),
  children: [
    {
      path: '/',
      name: 'statistics',
      component: r => require.ensure([], () => r(require('./pages/index')), '/statistics/')
    },
    {
      path: 'physics',
      name: 'statistics_physics',
      component: r => require.ensure([], () => r(require('./pages/physics')), '/statistics/physics')
    },
    {
      path: 'math',
      name: 'statistics_math',
      component: r => require.ensure([], () => r(require('./pages/math')), '/statistics/math')
    }
  ]
}
