import GettingStarted from './modules/getting-started/index.vue'
import Gl from './modules/gl/index.vue'
import NotFound from './components/pages/not-found.vue'

const routes = [
  { path: '/', component: GettingStarted },
  { path: '/gl/:id?', component: Gl },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

export { routes }