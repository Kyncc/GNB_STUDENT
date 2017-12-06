export default [
  {
    path: '/statistics/assemble',
    component: r => require.ensure([], () => r(require('./layout')), 'statistics/layout'),
    children: [
      {
        path: 'camera/:subject/:chapterId/:textbookId/:name',
        name: 'statisticsCamera',
        component: r => require.ensure([], () => r(require('./pages/camera')), 'statistics/camera')
      },
      {
        path: 'remember/:subject/:chapterId/:textbookId/:name',
        name: 'statisticsRemember',
        component: r => require.ensure([], () => r(require('./pages/remember')), 'statistics/remember')
      },
      {
        path: 'good/:subject/:chapterId/:textbookId/:name',
        name: 'statisticsGood',
        component: r => require.ensure([], () => r(require('./pages/good')), 'statistics/good')
      }
    ]
  },
  // 记错题筛选
  {
    path: '/statistics/assemble/remember/assemble/options',
    name: 'statisticsRemember_options',
    component: r => require.ensure([], () => r(require('./pages/rememberOptions')), 'statistics/remember/options')
  },
  // 精选题筛选
  {
    path: '/statistics/assemble/good/assemble/options',
    name: 'statisticsGood_options',
    component: r => require.ensure([], () => r(require('./pages/goodOptions')), 'statistics/good/options')
  },
  // 记错题组卷
  {
    path: '/statistics/remember/assemble/:textbookId/:subject',
    name: 'statisticsRemember_assemble',
    component: r => require.ensure([], () => r(require('./pages/rememberAssemble')), 'statistics/remember/assemble')
  },
  // 精选题组卷
  {
    path: '/statistics/good/assemble/:textbookId/:subject',
    name: 'statisticsGood_assemble',
    component: r => require.ensure([], () => r(require('./pages/goodAssemble')), 'statistics/good/assemble')
  },
  // 拍错题组卷
  {
    path: '/statistics/camera/assemble/:textbookId/:subject',
    name: 'statisticsCamera_assemble',
    component: r => require.ensure([], () => r(require('./pages/cameraAssemble')), 'statistics/camera/assemble')
  }
]
