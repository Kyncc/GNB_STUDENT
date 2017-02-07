import layout from './pages/layout'
import correct from './pages/correct'
import system from './pages/system'
import classes from './pages/class'
import modules from './modules/store'
import store from 'src/store'

export default {
  'message': {
    component: layout,
    subRoutes: {
      '/correct': {
        component: correct
      },
      '/system': {
        component: system
      },
      '/class': {
        component: classes
      }
    }
  }
}

store.registerModule('message', {
  ...modules
});
