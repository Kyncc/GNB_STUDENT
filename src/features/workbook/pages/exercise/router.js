 // 练习册练习
export default [
  {
    path: '/workbook/exercise',
    component: r => require.ensure([], () => r(require('./layout')), '/workbook/exercise'),
    redirect: '/workbook/exercise/result',
    children: [
      {
        path: 'answer/:name/:id',
        name: 'workbook_exercise_answer',
        component: r => require.ensure([], () => r(require('./answer')), '/workbook/exercise/answer')
      },
      {
        path: 'result/:name/:id',
        name: 'workbook_exercise_result',
        component: r => require.ensure([], () => r(require('./result')), '/workbook/exercise/result')
      },
      {
        path: 'error/:name/:id',
        name: 'workbook_exercise_error',
        component: r => require.ensure([], () => r(require('./error')), '/workbook/exercise/error')
      }
    ]
  },
  // 练习册章节
  {
    path: '/workbook/chapter/:name/:id',
    name: 'workbook_chapter',
    component: r => require.ensure([], () => r(require('./chapter')), '/workbook/chapter')
  }
]
