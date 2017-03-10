import modules from './modules/store'
import store from 'src/store'

export default {
  'message': {
    component:  r => require.ensure([], () => r(require('./pages/layout')), '/message'),
    subRoutes: {
      '/correct': {
        component: r => require.ensure([], () => r(require('./pages/correct')), '/message/correct')
      },
      '/system': {
        component: r => require.ensure([], () => r(require('./pages/system')), '/message/system')
      },
      '/class': {
        component: r => require.ensure([], () => r(require('./pages/class')), '/message/class')
      }
    }
  }
}

store.registerModule('message', {
  ...modules
});
