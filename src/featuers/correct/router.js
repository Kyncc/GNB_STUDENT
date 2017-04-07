export default {
  '/correct/:subjectId/:id': {
    component: r => require.ensure([], () => r(require('./pages/correct')), '/correct/')
  }
}
