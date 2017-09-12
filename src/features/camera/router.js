export default {
  path: '/camera',
  component: r => require.ensure([], () => r(require('./layout')), '/camera'),
  redirect: '/camera/chapter',
  children: [
    {
      path: 'points',
      name: 'camera_points',
      component: r => require.ensure([], () => r(require('./pages/points')), '/camera/points')
    },
    {
      path: 'options',
      name: 'camera_options',
      component: r => require.ensure([], () => r(require('./pages/options')), '/camera/center/options')
    },
    {
      path: 'choice/:subjectId/:grade/:id',
      name: 'camera_choice',
      component: r => require.ensure([], () => r(require('./pages/choice')), '/camera/choice')
    }
  ]
}
