import layout from './pages/layout'
import index from './pages/example'

export default  {
    'collect': {
      component: layout,
      subRoutes: {
        '/': {
          component: index,
        }
      }
    }
}
