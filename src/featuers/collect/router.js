export default {
  path: '/collect',
  component: r => require.ensure([], () => r(require('./pages/layout')), '/collect'),
  redirect: '/collect/math',
  children: [
    {
      path: 'physics',
      component: r => require.ensure([], () => r(require('./pages/physics')), '/collect/physics')
    },
    {
      path: 'math',
      component: r => require.ensure([], () => r(require('./pages/math')), '/collect/math')
    }
  ]
}
