export default {
  path: '/example/:subjectId/:id',
  name: 'example',
  component: r => require.ensure([], () => r(require('./pages/index')), '/example')
}
