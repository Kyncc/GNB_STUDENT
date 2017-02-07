import layout from './pages/layout'
import index from './pages/index'
import workbook from './pages/workbook'
import workbookByPage from './pages/page'
import exercise from './pages/exercise'
import example from './pages/example'
import add from './pages/add'
import TextBookAdd from '../textbook/pages/fromWorkbookAdd'

export default {
  'remember': {
    component: layout,
    subRoutes: {
      '/': {
        component: index
      },
      'add': {
        component: add
      },
      'example/:id': {
        component: example
      },
      'workbook/:bookId': {
        component: workbook
      },
      'workbook/byPage/:bookId': {
        component: workbookByPage
      },
      'workbook/exercise/:chapterId': {
        component: exercise
      },
      'textbook/add/:subjectId': {
        component: TextBookAdd
      }
    }
  }
}
