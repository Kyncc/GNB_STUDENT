export default {
  path: '/statistics',
  component: r => require.ensure([], () => r(require('./layout')), '/statistics'),
  name: 'statistics',
  redirect: '/statistics/math',
  children: [
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
