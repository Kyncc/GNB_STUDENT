import layout from './layout'
import index from './index'
//刷题型模块
import brush from '../../featrues/brush/router'
//记错题模块
import remember from '../../featrues/remember/router'

export default {
    'index': {
        component: layout,
        subRoutes: {
            '/':{component: index},
            ...brush,
            ...remember,
        }
    }
}
