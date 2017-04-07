export default {
  path: '/about',
  component: r => require.ensure([], () => r(require('./pages/layout')), '/about'),
  children: [
    {
      path: '/',
      component: r => require.ensure([], () => r(require('./pages/index')), '/about/index')
    },
    {
      path: 'advice',
      component: r => require.ensure([], () => r(require('./pages/advice')), '/about/advice')
    },
    {
      path: 'adviceHistory',
      component: r => require.ensure([], () => r(require('./pages/adviceHistory')), '/about/adviceHistory')
    }
  ]
}
