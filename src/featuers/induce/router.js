export default [
  // 题型归纳首页
  {
    path: '/induce',
    component: r => require.ensure([], () => r(require('./pages/layout')), '/induce'),
    redirect: '/induce/math',
    children: [
      {
        path: 'physics',
        name: 'indece_physics',
        component: r => require.ensure([], () => r(require('./pages/physics')), '/induce/physics')
      },
      {
        path: 'math',
        name: 'indece_math',
        component: r => require.ensure([], () => r(require('./pages/math')), '/induce/math')
      }
    ]
  },
  // 题型处置
  {
    path: '/induce/exercise/:subject/:chapterId/:chapterName',
    name: 'indece_exercise',
    component: r => require.ensure([], () => r(require('./pages/exercise/layout')), '/induce/exercise'),
    redirect: '/induce/exercise/:subject/:chapterId/:chapterName/total',
    children: [
      {
        path: 'total',
        name: 'indece_exercise_total',
        component: r => require.ensure([], () => r(require('./pages/exercise/total')), '/induce/exercise/total')
      },
      {
        path: 'pass',
        name: 'indece_exercise_pass',
        component: r => require.ensure([], () => r(require('./pages/exercise/pass')), '/induce/exercise/pass')
      },
      {
        path: 'break',
        name: 'indece_exercise_break',
        component: r => require.ensure([], () => r(require('./pages/exercise/break')), '/induce/exercise/break')
      },
      {
        path: 'practice',
        name: 'indece_exercise_practice',
        component: r => require.ensure([], () => r(require('./pages/exercise/practice')), '/induce/exercise/practice')
      }
    ]
  },
  // 练习题列表
  {
    path: '/induce/exercise/:subject/:chapterId/:chapterName/practice/list',
    name: 'indece_exercise_practice_list',
    component: r => require.ensure([], () => r(require('./pages/exercise/practiceList')), '/induce/exercise/practice/list')
  }
]
