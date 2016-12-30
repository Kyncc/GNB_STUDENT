import layout from './pages/layout'
import index from './pages/index'
import add from './pages/add'

export default  {
    'textbook': {
      component: layout,
      subRoutes: {
        '/': {
          component: index,
        },
        '/add': {
          component: add
        }
      }
    }
}
