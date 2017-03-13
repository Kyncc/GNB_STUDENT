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
      '/exercise': {
        component: r => require.ensure([], () => r(require('./pages/exercise/layout')), '/remember/exercise'),
        subRoutes: {
          '/main/:chapterId/:name/':{
            component: r => require.ensure([], () => r(require('./pages/exercise/exercise')), '/remember/exercise/'),
          },
          '/answer/:chapterId/:name/':{
            component: r => require.ensure([], () => r(require('./pages/exercise/answer')), '/remember/exercise/answer'),
          },
          '/error/:chapterId/:name/':{
            component: r => require.ensure([], () => r(require('./pages/exercise/error')), '/remember/exercise/error'),
          },
          '/upload/:chapterId/:name/':{
            component: r => require.ensure([], () => r(require('./pages/exercise/upload')), '/remember/exercise/upload'),
          }
        }
      }
    }
  }
}


store.registerModule('remember', {
  ...modules
});
