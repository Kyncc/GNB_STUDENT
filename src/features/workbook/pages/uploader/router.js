export default {
  path: '/workbook/uploader',
  component: r => require.ensure([], () => r(require('./layout')), '/workbook/uploader'),
  redirect: '/workbook/uploader/:name/:id',
  children: [
    {
      path: 'index/:id',
      name: 'workbook_uploader',
      component: r => require.ensure([], () => r(require('./uploader')), '/workbook/uploader/')
    },
    {
      path: 'photo/:id',
      name: 'workbook_uploader_photo',
      component: r => require.ensure([], () => r(require('./photo')), '/workbook/uploader/photo')
    }
  ]
}
