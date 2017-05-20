export default {
  path: '/error',
  component: r => require.ensure([], () => r(require('./pages/layout')), '/error'),
  redirect: '/error/math',
  children: [
    {
      path: 'physics',
      name: 'error_physics',
      component: r => require.ensure([], () => r(require('./pages/physics')), '/error/physics')
    },
    {
      path: 'math',
      name: 'error_math',
      component: r => require.ensure([], () => r(require('./pages/math')), '/error/math')
    }
  ]
}
