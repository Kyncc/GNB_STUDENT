export default {
  path: '/correct/:subjectId/:grade/:id',
  name: 'correct',
  component: r => require.ensure([], () => r(require('./pages/index')), '/correct')
}
