export default {
  path: '/statistics/assemble',
  component: r => require.ensure([], () => r(require('./pages/layout')), '/statistics'),
  children: [
    {
      path: 'camera',
      name: 'statisticsCamera',
      component: r => require.ensure([], () => r(require('./pages/camera')), '/statistics/camera')
    },
    {
      path: 'camera/assemble',
      name: 'statisticsCamera_assemble',
      component: r => require.ensure([], () => r(require('./pages/camera')), '/statistics/camera/assemble')
    },
    {
      path: 'remember',
      name: 'statisticsRemember',
      component: r => require.ensure([], () => r(require('./pages/remember')), '/statistics/remember')
    },
    {
      path: 'remember/assemble',
      name: 'statisticsRemember_assemble',
      component: r => require.ensure([], () => r(require('./pages/rememberAssemble')), '/statistics/remember/assemble')
    },
    {
      path: 'good',
      name: 'statisticsGood',
      component: r => require.ensure([], () => r(require('./pages/good')), '/statistics/good')
    },
    {
      path: 'good/assemble',
      name: 'statisticsGood_assemble',
      component: r => require.ensure([], () => r(require('./pages/goodAssemble')), '/statistics/good/assemble')
    }
  ]
}
