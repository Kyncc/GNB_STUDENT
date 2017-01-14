import layout from './pages/layout'
import Index from './pages/index'
import ResetPwd from './pages/resetPwd'
import Advice from './pages/advice'
import AdviceHistory from './pages/adviceHistory'

export default  {
  'settings': {
    component: layout,
    subRoutes: {
      '/': {
        component: Index,
      },
      'resetPwd': {
        component: ResetPwd
      },
      'advice': {
        component: Advice
      },
      'advice/history': {
        component: AdviceHistory
      }
    }
  }
}
