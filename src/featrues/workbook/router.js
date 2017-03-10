import modules from './modules/store'
import store from 'src/store'

export default  {
  'workbook': {
    component: r => require.ensure([], () => r(require('./pages/layout')), '/workbook'),
    subRoutes: {
      '/': {
        component: r => require.ensure([], () => r(require('./pages/index')), '/workbook/'),
      },
      '/add': {
        component: r => require.ensure([], () => r(require('./pages/add')), '/workbook/add'),
      }
    }
  }
}

store.registerModule('workbook', {
  ...modules
});