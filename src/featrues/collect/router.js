import layout from './pages/layout'
import index from './pages/example'
import detail from './pages/exampleDetail'

export default  {
    'collect': {
      component: layout,
      subRoutes: {
        '/example': {
          component: index,
        },
        '/example/detail/:id': {
          component: detail
        }
      }
    }
}
