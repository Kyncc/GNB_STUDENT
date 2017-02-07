import layout from './pages/layout'
import index from './pages/index'
import detail from './pages/detail'
import modules from './modules/store'
import store from 'src/store'

export default  {
  'report': {
    component: layout,
    subRoutes: {
      '/:code/:studentId': {
        component: index,
      },
      '/detail/:studentId/:chapterId': {
        component: detail
      }
    }
  }
}

store.registerModule('report', {
  ...modules
});