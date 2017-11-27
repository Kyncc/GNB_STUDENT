export default [
  {
    path: '/camera/points',
    name: 'camera_points',
    component: r => require.ensure([], () => r(require('./layout')), 'camera/points'),
    redirect: '/camera/points/math',
    children: [
      {
        path: 'physics',
        name: 'camera_points_physics',
        component: r => require.ensure([], () => r(require('./physics')), 'camera/points/physics')
      },
      {
        path: 'math',
        name: 'camera_points_math',
        component: r => require.ensure([], () => r(require('./math')), 'camera/points/math')
      },
      {
        path: 'chemistry',
        name: 'camera_points_chemistry',
        component: r => require.ensure([], () => r(require('./chemistry')), 'camera/points/chemistry')
      }
    ]
  }
]
