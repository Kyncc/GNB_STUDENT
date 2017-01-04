import layout from './pages/layout'
import chapter from './pages/chapter'
import list from './pages/list'
import example from './pages/example'

export default {
    '/pass': {
        component: layout,
        subRoutes: {
            '/': {
                component: chapter,
                name: 'passChapter'
            },
            '/list/:chapterId': {
                component: list,
                name: 'passList'
            },
            '/example/:subjectId/:id': {
                component: example,
                name: 'passExample'
            }
        }
    }
}
