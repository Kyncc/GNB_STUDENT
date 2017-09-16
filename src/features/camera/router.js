export default {
  path: '/camera',
  name: 'camera',
  component: r => require.ensure([], () => r(require('./layout')), '/camera'),
  redirect: '/camera/math',
  children: [
    {
      path: 'physics',
      name: 'camera_physics',
      component: r => require.ensure([], () => r(require('./pages/physics')), '/camera/physics')
    },
    {
      path: 'math',
      name: 'camera_math',
      component: r => require.ensure([], () => r(require('./pages/math')), '/camera/math')
    },
    {
      path: 'photo',
      name: 'camera_photo',
      component: r => require.ensure([], () => r(require('./pages/photo')), '/camera/photo')
    },
    {
      path: 'upload',
      name: 'camera_upload',
      component: r => require.ensure([], () => r(require('./pages/upload')), '/camera/upload')
    }
  ]
}
