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
  // 练习错题照片
  {
    path: '/workbook/exercise/photo',
    name: 'workbook_exercise_error_photo',
    component: r => require.ensure([], () => r(require('./photo')), '/workbook/exercise/photo')
  },
  // 练习册错题上传
  {
    path: '/workbook/exercise/upload/:chapterId/:wbeid/:eid',
    name: 'workbook_exercise_error_upload',
    component: r => require.ensure([], () => r(require('./upload')), '/workbook/exercise/upload')
  },
  // 练习册章节
  {
    path: '/workbook/chapter/:name/:id',
    name: 'workbook_chapter',
    component: r => require.ensure([], () => r(require('./chapter')), '/workbook/chapter')
  }
]
