export default {
  path: '/statistics/assemble',
  component: r => require.ensure([], () => r(require('./layout')), '/statistics'),
  children: [
    {
      path: 'camera/:subject/:chapterId',
      name: 'statisticsCamera',
      component: r => require.ensure([], () => r(require('./pages/camera')), '/statistics/camera')
    },
    // {
    //   path: 'camera/assemble/:subject',
    //   name: 'statisticsCamera_assemble',
    //   component: r => require.ensure([], () => r(require('./pages/camera')), '/statistics/camera/assemble')
    // },
    {
      path: 'remember/:subject/:chapterId',
      name: 'statisticsRemember',
      component: r => require.ensure([], () => r(require('./pages/remember')), '/statistics/remember')
    },
    // {
    //   path: 'remember/assemble/:subject',
    //   name: 'statisticsRemember_assemble',
    //   component: r => require.ensure([], () => r(require('./pages/rememberAssemble')), '/statistics/remember/assemble')
    // },
    {
      // 记错题筛选
      path: 'remember/assemble/options',
      name: 'statisticsRemember_assemble_options',
      component: r => require.ensure([], () => r(require('./pages/rememberOptions')), '/statistics/remember/options')
    },
    {
      path: 'good/:subject/:chapterId',
      name: 'statisticsGood',
      component: r => require.ensure([], () => r(require('./pages/good')), '/statistics/good')
    },
    // {
    //   path: 'good/assemble/:subject',
    //   name: 'statisticsGood_assemble',
    //   component: r => require.ensure([], () => r(require('./pages/goodAssemble')), '/statistics/good/assemble')
    // },
    {
      // 精选题筛选
      path: 'good/assemble/options',
      name: 'statisticsGood_assemble_options',
      component: r => require.ensure([], () => r(require('./pages/goodOptions')), '/statistics/good/options')
    }
  ]
}
