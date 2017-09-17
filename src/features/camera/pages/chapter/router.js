export default [
  {
    path: '/camera/chapter',
    name: 'camera_chapter',
    component: r => require.ensure([], () => r(require('./layout')), '/camera/chapter'),
    redirect: '/camera/chapter/math',
    children: [
      {
        path: 'physics',
        name: 'camera_chapter_physics',
        component: r => require.ensure([], () => r(require('./physics')), '/camera/chapter/physics')
      },
      {
        path: 'math',
        name: 'camera_chapter_math',
        component: r => require.ensure([], () => r(require('./math')), '/camera/chapter/math')
      }
    ]
  }
]
