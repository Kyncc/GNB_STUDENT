export default {
  path: '/report',
  component: r => require.ensure([], () => r(require('./pages/layout')), '/report'),
  redirect: '/report/math',
  children: [
    {
      path: 'physics',
      component: r => require.ensure([], () => r(require('./pages/physics')), '/report/physics')
    },
    {
      path: 'math',
      component: r => require.ensure([], () => r(require('./pages/math')), '/report/math')
    }
  ]
}
