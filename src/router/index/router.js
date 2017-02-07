import layout from './pages/layout'
import index from './pages/index'
// import workbookByClass from '../../features/workbookByClass/router'


export default {
  'index': {
    component: layout,
    subRoutes: {
      '/':{component: index},
      // ...workbookByClass
    }
  }
}
