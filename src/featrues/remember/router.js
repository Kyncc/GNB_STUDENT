export default {
  'remember': {
    component: r => require.ensure([], () => r(require('./pages/layout')), '/remember'),
    subRoutes: {
      '/': {
        component: r => require.ensure([], () => r(require('./pages/index')), '/remember/'),
      },
      '/chapter/:workbookId': {
        component: r => require.ensure([], () => r(require('./pages/chapter')), '/remember/chapter'),
      },
      '/upload':{
         component: r => require.ensure([], () => r(require('./pages/uploader/layout')), '/remember/upload'),
         subRoutes: {
            '/:chapterId/':{
                component: r => require.ensure([], () => r(require('./pages/uploader/upload')), '/remember/upload/photo'),
            },
            '/photo/:chapterId/':{
                component: r => require.ensure([], () => r(require('./pages/uploader/photo')), '/remember/upload/photo'),
            }
         }
      },
      '/exercise': {
        component: r => require.ensure([], () => r(require('./pages/exercise/layout')), '/remember/exercise'),
        subRoutes: {
          '/main/:chapterId/:name/':{
            component: r => require.ensure([], () => r(require('./pages/exercise/exercise')), '/remember/exercise/'),
          },
          '/answer/:chapterId/:name/':{
            name:'exerciseAnswer',
            component: r => require.ensure([], () => r(require('./pages/exercise/answer')), '/remember/exercise/answer'),
          },
          '/answer/:chapterId/:name/photo/':{
            name:'exerciseAnswerPhoto',
            component: r => require.ensure([], () => r(require('./pages/exercise/answer')), '/remember/exercise/answer'),
          },
          '/error/:chapterId/:name/':{
            component: r => require.ensure([], () => r(require('./pages/exercise/error')), '/remember/exercise/error'),
          }
        }
      }
    }
  }
}


