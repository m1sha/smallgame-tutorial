import 'vue3-universal-components/dist/vue3-universal-components.css'
import { createApp } from 'vue'
import { createWebHashHistory, createRouter } from 'vue-router'
import App from './App.vue'
import { routes } from './routes'
import './assets/index.sass'
import { createPinia } from 'pinia'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, _, next) => {
  const title = to.meta.title ? 'Smallgame - ' + to.meta.title as string : 'Smallgame'
  document.title =  title
  next()
})

const pinia = createPinia()

createApp(App)
  .use(router)
  .use(pinia)
  .mount('#app')
