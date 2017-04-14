export default {
  path: '/induce',
  component: r => require.ensure([], () => r(require('./pages/layout')), '/induce'),
  redirect: '/induce/math',
  children: [
    {
      path: 'physics',
      name: 'Indece_Physics',
      component: r => require.ensure([], () => r(require('./pages/physics')), '/induce/physics')
    },
    {
      path: 'math',
      name: 'Indece_Math',
      component: r => require.ensure([], () => r(require('./pages/math')), '/induce/math')
    },
    {
      path: 'exercise/:subject/:chapterId',
      component: r => require.ensure([], () => r(require('./pages/exercise')), '/induce/exercise'),
      children: []
    }
  ]
}
