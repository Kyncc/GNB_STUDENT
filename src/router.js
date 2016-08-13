import Vue from 'vue'
import Router from 'vue-router'

import App from './App'

const router = new Router()

router.map({
  '/': {
    component: App
  }
})


router.start(App, '#app')