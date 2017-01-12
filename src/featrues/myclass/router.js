import index from './pages/index'
import classmate from './pages/classmate'
import add from './pages/add'


export default  {
  'class': {
    component: index
  },
  'class/detail/:id': {
    component: classmate
  },
  'class/add': {
    component:add
  }
}
