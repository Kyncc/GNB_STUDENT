import layout from './pages/layout'
import index from './pages/index'
import chapter from './pages/chapter'
import page from './pages/page'
import exercise from './pages/exercise'
import modules from './modules/store'
import store from 'src/store'

export default {
  'remember': {
    component: layout,
    subRoutes: {
      '/': {
        component: index
      },
      '/chapter/:workbookId': {
        component: chapter
      },
      '/page/:workbookId': {
        component: page
      },
      '/exercise/:chapterId': {
        component: exercise
      }
    }
  }
}


store.registerModule('remember', {
  ...modules
});
