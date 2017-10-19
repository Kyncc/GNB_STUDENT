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
      // {
      //   path: 'remember/assemble/:subject',
      //   name: 'statisticsRemember_assemble',
      //   component: r => require.ensure([], () => r(require('./pages/rememberAssemble')), '/statistics/remember/assemble')
      // },
      {
        path: 'good/:subject/:chapterId/:name',
        name: 'statisticsGood',
        component: r => require.ensure([], () => r(require('./pages/good')), '/statistics/good')
      }
      // {
      //   path: 'good/assemble/:subject',
      //   name: 'statisticsGood_assemble',
      //   component: r => require.ensure([], () => r(require('./pages/goodAssemble')), '/statistics/good/assemble')
      // },
    ]
  },
  {
    // 记错题筛选
    path: '/statistics/assemble/remember/assemble/options',
    name: 'statisticsRemember_options',
    component: r => require.ensure([], () => r(require('./pages/rememberOptions')), '/statistics/remember/options')
  },
  {
    // 精选题筛选
    path: '/statistics/assemble/good/assemble/options',
    name: 'statisticsGood_options',
    component: r => require.ensure([], () => r(require('./pages/goodOptions')), '/statistics/good/options')
  }
  // {
  //   path: '/statistics/camera/assemble/:subject',
  //   name: 'statisticsCamera_assemble',
  //   component: r => require.ensure([], () => r(require('./pages/camera')), '/statistics/camera/assemble')
  // }
  // {
  //   path: '/statistics/camera/assemble/:subject',
  //   name: 'statisticsCamera_assemble',
  //   component: r => require.ensure([], () => r(require('./pages/camera')), '/statistics/camera/assemble')
  // }
]
