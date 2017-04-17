export default [
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
  {
    path: '/workbook/add',
    name: 'workbook_add',
    component: r => require.ensure([], () => r(require('./pages/books/add')), '/workbook/add')
  }
]
