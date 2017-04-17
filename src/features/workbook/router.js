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
  // 练习册章节
  {
    path: '/workbook/chapter/:name/:id',
    name: 'workbook_chapter',
    component: r => require.ensure([], () => r(require('./pages/exercise/chapter')), '/workbook/chapter')
  },
  // 作业上传模块
  {
    path: '/workbook/uploader',
    name: 'workbook_uploader',
    component: r => require.ensure([], () => r(require('./pages/uploader/layout')), '/workbook/uploader'),
    children: [
      {
        path: '/workbook/uploader/:id',
        name: 'workbook_uploader',
        component: r => require.ensure([], () => r(require('./pages/uploader/uploader')), '/workbook/uploader/')
      },
      {
        path: 'photo',
        name: 'workbook_uploader_photo',
        component: r => require.ensure([], () => r(require('./pages/uploader/photo')), '/workbook/uploader/photo')
      }
    ]
  }
]
