import layout from './pages/layout'
import classes from './pages/class'
import correct from './pages/correct'
import system from './pages/system'

export default {
  'message': {
    component: layout,
    subRoutes: {
      '/class': {
        component: classes,
      },
      '/correct': {
        component: correct
      },
      '/system': {
        component: system
      }
    }
  }
}
