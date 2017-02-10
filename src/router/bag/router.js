import layout from './pages/layout'
import index from './pages/index'
import pass from '../../featrues/pass/router'
import Break from '../../featrues/break/router'
import workbook from '../../featrues/workbook/router'
import textbook from '../../featrues/textbook/router'
import report from '../../featrues/report/router'
import collect from '../../featrues/collect/router'

export default {
  'bag': {
    component: layout,
    subRoutes: {
      '/': {
        component: index
      },
      ...report,
      ...pass,
      ...Break,
      ...textbook,
      ...workbook,
      ...collect
    }
  }
}
