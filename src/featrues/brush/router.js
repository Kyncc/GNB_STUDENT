import modules from './modules/store'
import store from 'src/store'

export default {
  'brush': {
    component: r => require.ensure([], () => r(require('./pages/layout')), '/brush'),
    subRoutes: {
      '/': {
        component: r => require.ensure([], () => r(require('./pages/index')), '/brush/'),
      },
      '/list/:chapterId': {
        component: r => require.ensure([], () => r(require('./pages/list')), '/brush/list'),
      }
    }
  }
}

store.registerModule('brush', {
  ...modules
});
