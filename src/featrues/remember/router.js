import modules from './modules/store'
import store from 'src/store'

export default {
  'remember': {
    component: r => require.ensure([], () => r(require('./pages/layout')), '/remember'),
    subRoutes: {
      '/': {
        component: r => require.ensure([], () => r(require('./pages/index')), '/remember/'),
      },
      '/chapter/:workbookId': {
        component: r => require.ensure([], () => r(require('./pages/chapter')), '/remember/chapter'),
      },
      '/page/:workbookId': {
        component: r => require.ensure([], () => r(require('./pages/page')), '/remember/page'),
      },
      '/exercise/:chapterId': {
        component: r => require.ensure([], () => r(require('./pages/exercise')), '/remember/exercise'),
      }
    }
  }
}


store.registerModule('remember', {
  ...modules
});
