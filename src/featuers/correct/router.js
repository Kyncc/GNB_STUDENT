export default {
  path: '/correct/:subjectId/:id',
  name: 'correct',
  component: r => require.ensure([], () => r(require('./pages/index')), '/correct')
}
