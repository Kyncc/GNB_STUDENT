import modules from './modules/store'
import store from 'src/store'

export default {
  '/pass': {
    component: r => require.ensure([], () => r(require('./pages/layout')), '/pass'),
    subRoutes: {
      '/': {
        component: r => require.ensure([], () => r(require('./pages/index')), '/pass/'),
      },
      '/list/:chapterId': {
          component:  r => require.ensure([], () => r(require('./pages/list')), '/pass/list'),
      }
    }
  }
}


store.registerModule('pass', {
  ...modules
});