import layout from './pages/layout'
import index from './pages/index'
import classmate from './pages/classmate'
import add from './pages/add'
import modules from './modules/store'
import store from 'src/store'

export default  {
  'class': {
    component: layout,
    subRoutes: {
      '/': {
        component: index
      },
      '/add': {
        component:add
      },
      '/detail/:code': {
        component: classmate
      },
    }
  }
}

store.registerModule('class', {
  ...modules
});
