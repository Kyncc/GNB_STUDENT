export default {
  path: '/myBook/want',
  component: r => require.ensure([], () => r(require('./layout')), 'myBook/want'),
  redirect: '/myBook/want',
  children: [
    {
      path: 'index',
      name: 'myBook_want',
      component: r => require.ensure([], () => r(require('./want')), 'myBook/want/index')
    },
    {
      path: 'photo',
      name: 'myBook_want_photo',
      component: r => require.ensure([], () => r(require('./photo')), 'myBook/want/photo')
    }
  ]
}
