export default {
  path: '/example/:subjectId/:id',
  component: r => require.ensure([], () => r(require('./pages/index')), '/example')
}
