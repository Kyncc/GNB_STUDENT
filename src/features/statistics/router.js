export default {
  path: '/statistics',
  component: r => require.ensure([], () => r(require('./layout')), '/statistics'),
  children: [
    {
      path: '/',
      name: 'statistics',
      component: r => require.ensure([], () => r(require('./index/pages/layout')), '/statistics/'),
      redirect: '/statistics/math',
      children: [
        {
          path: 'physics',
          name: 'statistics_physics',
          component: r => require.ensure([], () => r(require('./index/pages/physics')), '/statistics/physics')
        },
        {
          path: 'math',
          name: 'statistics_math',
          component: r => require.ensure([], () => r(require('./index/pages/math')), '/statistics/math')
        }
      ]
    }
  ]
}
