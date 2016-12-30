import remember from './pages/index'
import rememberWorkbook from './pages/workbook'
import rememberWorkbookByPage from './pages/page'
import rememberExercise from './pages/exercise'
import rememberExample from './pages/example'
import rememberAdd from './pages/add'
import rememberTextBookAdd from '../featrues/textbook/pages/fromWorkbookAdd'

export default  {
    'remember': {
      component: remember
    },
    'remember/add': {
      component: rememberAdd
    },
    'remember/example/:id': {
      component: rememberExample
    },
    'remember/workbook/:bookId': {
      component: rememberWorkbook
    },
    'remember/workbook/byPage/:bookId': {
      component: rememberWorkbookByPage
    },
    'remember/workbook/exercise/:chapterId': {
      component: rememberExercise
    },
    'remember/textbook/add/:subjectId': {
      component: rememberTextBookAdd
    }
}
