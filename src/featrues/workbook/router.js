import layout from './pages/layout'
import index from './pages/index'
import chapter from './pages/chapter'
import page from './pages/page'
import exercise from './pages/exercise'
import modules from './modules/store'
import store from 'src/store'

export default {
  'workbookByStu': {
    component: layout,
    subRoutes: {
      '/:code/:studentId': {
        component: index
      },
      'chapter/:studentId/:workbookId': {
        component: chapter
      },
      'page/:studentId/:workbookId': {
        component: page
      },
      'exercise/:studentId/:chapterId': {
        component: exercise
      }
    }
  }
}


store.registerModule('rememberStudent', {
  ...modules
});
