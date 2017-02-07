import layout from './pages/layout'
import login from './pages/login'
import register from './pages/register'
import forget from './pages/forget'
import info from './pages/info'
import resetPassword from './pages/resetPassword'
import setPassword from './pages/setPassword'
import modules from './modules/store'
import store from 'src/store'

export default {
  '/': {
    component: layout,
    subRoutes: {
      'login': {
        component: login,
      },
      'register': {
        component: register,
      },
      'setPassword': {
        component: setPassword,
      },
      'info':{
         component: info,
      },
      'forget': {
        component: forget,
      },
      'resetPassword': {
        component: resetPassword,
      }
    }
  }
}

store.registerModule('login', {
  ...modules
});