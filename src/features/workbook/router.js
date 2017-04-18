import exercise from './pages/exercise/router'
import uploader from './pages/uploader/router'

export default [
  // 练习册
  {
    path: '/workbook',
    component: r => require.ensure([], () => r(require('./pages/books/layout')), '/workbook'),
    redirect: '/workbook/math',
    children: [
      {
        path: 'physics',
        name: 'workbook_physics',
        component: r => require.ensure([], () => r(require('./pages/books/physics')), '/workbook/physics')
      },
      {
        path: 'math',
        name: 'workbook_math',
        component: r => require.ensure([], () => r(require('./pages/books/math')), '/workbook/math')
      }
    ]
  },
  // 练习册增加
  {
    path: '/workbook/add',
    name: 'workbook_add',
    component: r => require.ensure([], () => r(require('./pages/books/add')), '/workbook/add')
  },
  // 练习模块
  ...exercise,
  // 作业上传模块
  uploader
]
