export default [
  // 练习册
  {
    path: '/myBook',
    component: r => require.ensure([], () => r(require('./pages/layout')), '/myBook'),
    redirect: '/myBook/math',
    children: [
      {
        path: 'physics',
        name: 'myBook_physics',
        component: r => require.ensure([], () => r(require('./pages/physics')), '/myBook/physics')
      },
      {
        path: 'math',
        name: 'myBook_math',
        component: r => require.ensure([], () => r(require('./pages/math')), '/myBook/math')
      }
    ]
  },
  // 练习册增加
  {
    path: '/myBook/:subject/add',
    name: 'myBook_add',
    component: r => require.ensure([], () => r(require('./pages/add')), '/myBook/add')
  },
  // 练习册搜索
  {
    path: '/myBook/:subject/search',
    name: 'myBook_search',
    component: r => require.ensure([], () => r(require('./pages/search')), '/myBook/search')
  }
]
