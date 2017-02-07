import layout from './pages/layout'
import chapter from './pages/chapter'
import list from './pages/list'
import example from './pages/example'

export default {
    '/break': {
        component: layout,
        subRoutes: {
            '/': {
                component: chapter,
                name: 'breakChapter'
            },
            '/list/:chapterId': {
                component: list,
                name: 'breakList'
            },
            '/example/:subjectId/:id': {
                component: example,
                name: 'breakExample'
            }
        },
    }
}
