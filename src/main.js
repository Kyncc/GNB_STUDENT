import Vue from 'vue'
import Router from 'vue-router'

import App from './App'
import Hello from './Hello'


Vue.use(Router)
Vue.config.devtools = true

const router = new Router()

router.map({
  '/': {
    component: App
  },
  '/hello/': {
    component: Hello
  }
})


router.start(App,'#app')