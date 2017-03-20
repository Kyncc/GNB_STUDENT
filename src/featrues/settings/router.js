export default {
  'settings': {
    component: r => require.ensure([], () => r(require('./pages/layout')), '/settings'),
    subRoutes: {
      '/': {
        component: r => require.ensure([], () => r(require('./pages/index')), '/settings/'),
      },
      '/info': {
        component: r => require.ensure([], () => r(require('./pages/info')), '/settings/info'),
      },
      '/resetPwd': {
        component: r => require.ensure([], () => r(require('./pages/resetPwd')), '/settings/resetPwd'),
      },
      '/advice': {
        component: r => require.ensure([], () => r(require('./pages/advice')), '/settings/advice'),
      },
      '/adviceList': {
        component: r => require.ensure([], () => r(require('./pages/adviceHistory')), '/settings/adviceList'),
      }
    }
  }
}


