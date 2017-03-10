import pass from '../../featrues/pass/router'
import Break from '../../featrues/break/router'
import brushed from '../../featrues/brushed/router'
import workbook from '../../featrues/workbook/router'
import report from '../../featrues/report/router'
import collect from '../../featrues/collect/router'

export default {
  'bag': {
    component:  r => require.ensure([], () => r(require('./pages/layout')), '/bag'),
    subRoutes: {
      '/': {
        component:  r => require.ensure([], () => r(require('./pages/index')), '/bag/'),
      },
      ...report,
      ...pass,
      ...brushed,
      ...Break,
      ...workbook,
      ...collect
    }
  }
}
