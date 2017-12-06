import chapter from './pages/chapter/router'
import points from './pages/points/router'

export default {
  path: '/camera',
  name: 'camera',
  component: r => require.ensure([], () => r(require('./pages/layout')), 'camera/layout'),
  redirect: '/camera/chapter',
  children: [
    ...chapter,
    ...points,
    {
      path: 'photo',
      name: 'camera_photo',
      component: r => require.ensure([], () => r(require('./pages/photo')), 'camera/photo')
    },
    {
      path: 'upload',
      name: 'camera_upload',
      component: r => require.ensure([], () => r(require('./pages/upload')), 'camera/upload')
    }
  ]
}
