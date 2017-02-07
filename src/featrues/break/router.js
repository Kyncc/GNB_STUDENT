import layout from './pages/layout'
import chapter from './pages/chapter'
import list from './pages/list'
import modules from './modules/store'
import store from 'src/store'

export default {
	'/break': {
		component: layout,
		subRoutes: {
			'/:code/:studentId': {
					component: chapter,
			},
			'/list/:studentId/:chapterId': {
					component: list,
			}
		}
	}
}

store.registerModule('break', {
  ...modules
});