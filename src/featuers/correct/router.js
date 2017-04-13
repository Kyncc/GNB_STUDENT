export default {
  path: '/correct/:subjectId/:id',
  component: r => require.ensure([], () => r(require('./pages/index')), '/correct')
}
