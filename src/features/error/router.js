export default [
  {
    path: '/error',
    component: r => require.ensure([], () => r(require('./pages/layout')), '/error'),
    name: 'error',
    redirect: '/error/math',
    children: [
      {
        path: 'physics',
        name: 'error_physics',
        component: r => require.ensure([], () => r(require('./pages/physics')), '/error/physics')
      },
      {
        path: 'math',
        name: 'error_math',
        component: r => require.ensure([], () => r(require('./pages/math')), '/error/math')
      },
      {
        path: 'chemistry',
        name: 'error_chemistry',
        component: r => require.ensure([], () => r(require('./pages/chemistry')), '/error/chemistry')
      },
      {
        path: 'detail/:chapterId/:eid/:id',
        name: 'error_detail',
        component: r => require.ensure([], () => r(require('./pages/detail')), '/error/detail')
      }
    ]
  },
  {
    path: '/error/comment/:wbeid',
    name: 'error_comment',
    component: r => require.ensure([], () => r(require('./pages/comment')), '/error/comment')
  }
]
