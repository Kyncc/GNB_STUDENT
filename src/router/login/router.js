import modules from './modules/store'
import store from 'src/store'

export default {
  '/': {
    component: r => require.ensure([], () => r(require('./pages/layout')), '/'),
    subRoutes: {
      'login': {
        component: r => require.ensure([], () => r(require('./pages/login')), '/login'),
      },
      'register': {
        component: r => require.ensure([], () => r(require('./pages/register')), '/register') ,
      },
      'setPassword': {
        component: r => require.ensure([], () => r(require('./pages/setPassword')), '/setPassword') ,
      },
      'info':{
         component: r => require.ensure([], () => r(require('./pages/info')), '/info'),
      },
      'forget': {
        component: r => require.ensure([], () => r(require('./pages/forget')), '/forget') ,
      },
      'resetPassword': {
        component: r => require.ensure([], () => r(require('./pages/resetPassword')), '/resetPassword') ,
      }
    }
  }
}

store.registerModule('login', {
  ...modules
});

