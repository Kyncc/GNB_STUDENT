export default {
  path: '/message',
  component: r => require.ensure([], () => r(require('./pages/layout')), '/message'),
  redirect: '/message/',
  children: [
    {
      path: '/',
      component: r => require.ensure([], () => r(require('./pages/index')), '/message/')
    },
    {
      path: 'correct',
      component: r => require.ensure([], () => r(require('./pages/correct')), '/message/correct')
    },
    {
      path: 'system',
      component: r => require.ensure([], () => r(require('./pages/system')), '/message/system')
    },
    {
      path: 'class',
      component: r => require.ensure([], () => r(require('./pages/class')), '/message/class')
    }
  ]
}
