export default [
  {
    path: '/example/:subjectId/:id',
    name: 'example',
    component: r => require.ensure([], () => r(require('./pages/example')), 'example')
  },
  {
    path: '/practise/:subjectId/:id',
    name: 'practise',
    component: r => require.ensure([], () => r(require('./pages/practise')), 'practise')
  }
]
