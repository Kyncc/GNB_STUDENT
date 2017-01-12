import Index from './pages/index'
import ResetPwd from './pages/resetPwd'
import Advice from './pages/advice'
import AdviceHistory from './pages/adviceHistory'

export default  {
  'settings': {
    component: Index
  },
  'settings/resetPwd': {
    component: ResetPwd
  },
  'settings/advice': {
    component: Advice
  },
  'settings/advice/history': {
    component: AdviceHistory
  }
}
