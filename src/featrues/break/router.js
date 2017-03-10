import modules from './modules/store'
import store from 'src/store'

export default {
  '/break': {
    component: r => require.ensure([], () => r(require('./pages/layout')), '/break'),
    subRoutes: {
      '/': {
        component: r => require.ensure([], () => r(require('./pages/index')), '/break/'),
      },
      '/list/:chapterId': {
        component:  r => require.ensure([], () => r(require('./pages/list')), '/break/list'),
      }
    }
  }
}

store.registerModule('break', {
  ...modules
});