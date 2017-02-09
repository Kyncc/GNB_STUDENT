import layout from './pages/layout'
import index from './pages/index'
import add from './pages/add'
import modules from './modules/store'
import store from 'src/store'

export default  {
  'workbook': {
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


store.registerModule('workbook', {
  ...modules
});