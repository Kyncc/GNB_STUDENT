import modules from './modules/store'
import store from 'src/store'

export default {
  '/example/:subjectId/:id': {
    component: r => require.ensure([], () => r(require('./pages/index')), '/example/')
  }
}

store.registerModule('example', {
  ...modules
});