export default {
  path: '/errorCamera',
  component: r => require.ensure([], () => r(require('./pages/layout')), '/errorCamera'),
  name: 'errorCamera',
  redirect: '/errorCamera/math',
  children: [
    {
      path: 'physics',
      name: 'errorCamera_physics',
      component: r => require.ensure([], () => r(require('./pages/physics')), '/errorCamera/physics')
    },
    {
      path: 'math',
      name: 'errorCamera_math',
      component: r => require.ensure([], () => r(require('./pages/math')), '/errorCamera/math')
    },
    {
      path: 'chemistry',
      name: 'errorCamera_chemistry',
      component: r => require.ensure([], () => r(require('./pages/chemistry')), '/errorCamera/chemistry')
    }
  ]
}
