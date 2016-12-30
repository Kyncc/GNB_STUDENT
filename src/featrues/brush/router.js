import brush from './pages/layout'
import brushChapter from './pages/chapter'
import brushList from './pages/list'
import brushExample from './pages/example'

export default  {
    'brush': {
      component: brush,
      subRoutes: {
        '/': {
          component: brushChapter,
          name: 'brushChapter'
        },
        '/list/:chapterId': {
          component: brushList,
          name: 'brushList'
        },
        '/example/:subjectId/:id': {
          component: brushExample,
          name: 'brushExample'
        }
      },
    }
}
