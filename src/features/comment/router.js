export default {
  path: '/comment/:wbeid',
  name: 'comment',
  component: r => require.ensure([], () => r(require('./pages/comment')), '/comment')
}
