import correct from './pages/correct'
import modules from './modules/store'
import store from 'src/store'

export default {
  '/correct/:studentId/:subjectId/:id': {
    component: correct
  }
}

store.registerModule('correct', {
  ...modules
});