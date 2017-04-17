export default [
  {
    path: '/report',
    component: r => require.ensure([], () => r(require('./pages/layout')), '/report'),
    redirect: '/report/math',
    children: [
      {
        path: 'physics',
        name: 'report_physics',
        component: r => require.ensure([], () => r(require('./pages/physics')), '/report/physics')
      },
      {
        path: 'math',
        name: 'report_math',
        component: r => require.ensure([], () => r(require('./pages/math')), '/report/math')
      }
    ]
  },
  {
    path: '/report/detail/:chapterId',
    name: 'report_detail',
    component: r => require.ensure([], () => r(require('./pages/detail')), '/report/detail')
  }
]
