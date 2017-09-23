export default [
  // 练习册
  {
    path: '/myBook',
    component: r => require.ensure([], () => r(require('./layout')), '/myBook'),
    redirect: '/myBook/math',
    children: [
      {
        path: 'physics',
        name: 'myBook_physics',
        component: r => require.ensure([], () => r(require('./physics')), '/myBook/physics')
      },
      {
        path: 'math',
        name: 'myBook_math',
        component: r => require.ensure([], () => r(require('./math')), '/myBook/math')
      },
      {
        path: 'chemistry',
        name: 'myBook_chemistry',
        component: r => require.ensure([], () => r(require('./chemistry')), '/myBook/chemistry')
      }
    ]
  },
  // 练习册增加
  {
    path: '/myBook/:subject/add',
    name: 'myBook_add',
    component: r => require.ensure([], () => r(require('./add')), '/myBook/add')
  },
  // 练习册搜索
  {
    path: '/myBook/:subject/search',
    name: 'myBook_search',
    component: r => require.ensure([], () => r(require('./search')), '/myBook/search')
  }
]
