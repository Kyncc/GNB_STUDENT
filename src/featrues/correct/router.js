import modules from './modules/store'
import store from 'src/store'

export default {
  '/correct/:subjectId/:id': {
    component: r => require.ensure([], () => r(require('./pages/correct')), '/correct/')
  }
}

store.registerModule('correct', {
  ...modules
});