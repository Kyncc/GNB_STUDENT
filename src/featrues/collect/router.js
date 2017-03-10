import modules from './modules/store'
import store from 'src/store'

export default  {
  'collect': {
    component:  r => require.ensure([], () => r(require('./pages/layout')), '/collect'),
    subRoutes: {
      '/': {
        component: r => require.ensure([], () => r(require('./pages/index')), '/collect/'),
      }
    }
  }
}

store.registerModule('collect', {
  ...modules
});