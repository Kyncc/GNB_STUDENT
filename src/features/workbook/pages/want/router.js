export default {
  path: '/workbook/want',
  component: r => require.ensure([], () => r(require('./layout')), '/workbook/want'),
  redirect: '/workbook/want',
  children: [
    {
      path: 'index',
      name: 'workbook_want',
      component: r => require.ensure([], () => r(require('./want')), '/workbook/want/index')
    },
    {
      path: 'photo',
      name: 'workbook_want_photo',
      component: r => require.ensure([], () => r(require('./photo')), '/workbook/want/photo')
    }
  ]
}
