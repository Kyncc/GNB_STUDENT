import correct from './pages/correct'
import modules from './modules/store'
import store from 'src/store'

export default {
  '/correct/:subjectId/:id': {
    component: correct
  }
}

store.registerModule('correct', {
  ...modules
});