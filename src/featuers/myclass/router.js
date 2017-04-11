export default {
  path: '/class',
  component: r => require.ensure([], () => r(require('./pages/layout')), '/class'),
  children: [
    {
      path: '/',
      component: r => require.ensure([], () => r(require('./pages/index')), '/class/')
    },
    {
      path: 'add',
      component: r => require.ensure([], () => r(require('./pages/add')), '/class/add')
    },
    {
      path: 'message',
      redirect: '/message/class'
    },
    {
      path: 'detail/:code',
      component: r => require.ensure([], () => r(require('./pages/classmate')), '/class/detail')
    }
  ]
}
