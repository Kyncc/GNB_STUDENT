export default [
  {
    path: '/workbook',
    component: r => require.ensure([], () => r(require('./pages/books/layout')), '/workbook'),
    redirect: '/workbook/math',
    children: [
      {
        path: 'physics',
        component: r => require.ensure([], () => r(require('./pages/books/physics')), '/workbook/physics')
      },
      {
        path: 'math',
        component: r => require.ensure([], () => r(require('./pages/books/math')), '/workbook/math')
      }
    ]
  },
  {
    path: '/workbook/add',
    component: r => require.ensure([], () => r(require('./pages/books/add')), '/workbook/add')
  }
]
