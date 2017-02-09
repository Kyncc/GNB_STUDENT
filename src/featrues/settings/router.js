import layout from './pages/layout'
import index from './pages/index'
import info from './pages/info'
import resetPwd from './pages/resetPwd'
import advice from './pages/advice'
import adviceList from './pages/adviceHistory'
import modules from './modules/store'
import store from 'src/store'

export default {
  'settings': {
    component: layout,
    subRoutes: {
      '/': {
        component: index,
      },
      '/info': {
        component: info,
      },
      '/resetPwd': {
        component: resetPwd,
      },
      '/advice': {
        component: advice,
      },
      '/adviceList': {
        component: adviceList
      }
    }
  }
}


store.registerModule('settings', {
  ...modules
});