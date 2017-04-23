export default [
  // 练习册
  {
    path: '/workbook',
    component: r => require.ensure([], () => r(require('./layout')), '/workbook'),
    redirect: '/workbook/math',
    children: [
      {
        path: 'physics',
        name: 'workbook_physics',
        component: r => require.ensure([], () => r(require('./physics')), '/workbook/physics')
      },
      {
        path: 'math',
        name: 'workbook_math',
        component: r => require.ensure([], () => r(require('./math')), '/workbook/math')
      }
    ]
  },
  // 练习册增加
  {
    path: '/workbook/:subject/add',
    name: 'workbook_add',
    component: r => require.ensure([], () => r(require('./add')), '/workbook/add')
  },
  // 练习册搜索
  {
    path: '/workbook/:subject/search',
    name: 'workbook_search',
    component: r => require.ensure([], () => r(require('./search')), '/workbook/search')
  }
]
