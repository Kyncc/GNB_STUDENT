import layout from './pages/layout'
import index from './pages/index'
import detail from './pages/detail'

export default  {
    'report': {
      component: layout,
      subRoutes: {
        '/': {
          component: index,
        },
        '/detail/:chapterId': {
          component: detail
        }
      }
    }
}
