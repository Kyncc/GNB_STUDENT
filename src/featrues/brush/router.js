import layout from './pages/layout'
import index from './pages/index'
import list from './pages/list'
import modules from './modules/store'
import store from 'src/store'

export default{
  'brush': {
    component: layout,
    subRoutes: {
      '/': {
        component: index
      },
      '/list/:chapterId': {
        component: list
      }
    }
  }
}

store.registerModule('brush', {
  ...modules
});
