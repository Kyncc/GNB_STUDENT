export default {
  path: '/download',
  component: r => require.ensure([], () => r(require('./pages/layout')), '/download'),
  children: [
    {
      path: '/',
      name: 'download',
      component: r => require.ensure([], () => r(require('./pages/index')), '/download/index')
    },
    {
      path: 'camera',
      name: 'downloadCamera',
      component: r => require.ensure([], () => r(require('./pages/camera')), '/download/camera')
    },
    {
      path: 'camera/:id',
      name: 'downloadCamera_detail',
      component: r => require.ensure([], () => r(require('./pages/cameraDetail')), '/download/camera/detail')
    },
    {
      path: 'good',
      name: 'downloadGood',
      component: r => require.ensure([], () => r(require('./pages/good')), '/download/good')
    },
    {
      path: 'good/:id',
      name: 'downloadGood_detail',
      component: r => require.ensure([], () => r(require('./pages/goodDetail')), '/download/good/detail')
    },
    {
      path: 'remember',
      name: 'downloadRemember',
      component: r => require.ensure([], () => r(require('./pages/remember')), '/download/remember')
    },
    {
      path: 'remember/:id',
      name: 'downloadRemember_detail',
      component: r => require.ensure([], () => r(require('./pages/rememberDetail')), '/download/remember/detail')
    }
  ]
}
