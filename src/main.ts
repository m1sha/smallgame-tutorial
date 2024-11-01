import { createApp } from 'vue'
import { createWebHashHistory, createRouter } from 'vue-router'
import App from './App.vue'
import { routes } from './routes'
import './assets/index.sass'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
