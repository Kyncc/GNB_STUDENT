import modules from './modules/store'
import store from 'src/store'

export default  {
  'report': {
    component: r => require.ensure([], () => r(require('./pages/layout')), '/report'),
    subRoutes: {
      '/': {
        component: r => require.ensure([], () => r(require('./pages/index')), '/report/'),
      },
      '/detail/:chapterId': {
        component:  r => require.ensure([], () => r(require('./pages/detail')), '/report/detail'),
      }
    }
  }
}

store.registerModule('report', {
  ...modules
});