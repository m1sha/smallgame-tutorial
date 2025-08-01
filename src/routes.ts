import GettingStarted from './modules/getting-started/index.vue'
import Flappy from './modules/flappy/index.vue'
import Gl from './modules/gl/index.vue'
import GlRaw from './modules/gl-raw/index.vue'
import RasterFilers from './modules/raster-filters/index.vue'
import NotFound from './components/pages/not-found.vue'

const routes = [
  { path: '/', component: GettingStarted },
  { path: '/gl/:id?', component: Gl },
  { path: '/gl-raw/:id?', component: GlRaw },
  { path: '/flappy', component: Flappy },
  { path: '/raster-filers', component: RasterFilers },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

export { routes }