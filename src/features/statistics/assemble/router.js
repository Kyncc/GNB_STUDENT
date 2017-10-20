export default [
  {
    path: '/statistics/assemble',
    component: r => require.ensure([], () => r(require('./layout')), '/statistics'),
    children: [
      {
        path: 'camera/:subject/:chapterId/:name',
        name: 'statisticsCamera',
        component: r => require.ensure([], () => r(require('./pages/camera')), '/statistics/camera')
      },
      {
        path: 'remember/:subject/:chapterId/:name',
        name: 'statisticsRemember',
        component: r => require.ensure([], () => r(require('./pages/remember')), '/statistics/remember')
      },
      {
        path: 'good/:subject/:chapterId/:name',
        name: 'statisticsGood',
        component: r => require.ensure([], () => r(require('./pages/good')), '/statistics/good')
      }
    ]
  },
  // 记错题筛选
  {
    path: '/statistics/assemble/remember/assemble/options',
    name: 'statisticsRemember_options',
    component: r => require.ensure([], () => r(require('./pages/rememberOptions')), '/statistics/remember/options')
  },
  // 精选题筛选
  {
    path: '/statistics/assemble/good/assemble/options',
    name: 'statisticsGood_options',
    component: r => require.ensure([], () => r(require('./pages/goodOptions')), '/statistics/good/options')
  },
  // 记错题组卷
  {
    path: '/statistics/remember/assemble/:subject',
    name: 'statisticsRemember_assemble',
    component: r => require.ensure([], () => r(require('./pages/rememberAssemble')), '/statistics/remember/assemble')
  },
  // 拍错题组卷
  {
    path: '/statistics/camera/assemble/:subject',
    name: 'statisticsCamera_assemble',
    component: r => require.ensure([], () => r(require('./pages/cameraAssemble')), '/statistics/camera/assemble')
  }
]
