import 'vue3-universal-components/dist/vue3-universal-components.css'
import './assets/index.sass'
import { createApp } from 'vue'
import { createWebHashHistory, createRouter } from 'vue-router'
import App from './App.vue'
import { routes } from './routes'
import { createPinia } from 'pinia'
import { regCustomComponents } from './reg-custom-components.ts'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, _, next) => {
  const title = to.meta.title ? 'Zehphyr - ' + to.meta.title as string : 'Zehphyr'
  document.title =  title
  next()
})

const pinia = createPinia()
regCustomComponents()
createApp(App)
  .use(router)
  .use(pinia)
  .mount('#app')
