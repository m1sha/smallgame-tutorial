import GettingStarted from './modules/getting-started/index.vue'
import Flappy from './modules/flappy/index.vue'
import Gl from './modules/gl/index.vue'
import GlEffects from './modules/gl-effects/index.vue'
import Surfaces from './modules/surfaces/index.vue'
import Examples from './modules/examples/index.vue'
import RasterFilers from './modules/raster-filters/index.vue'
import { PolygonEditor } from './modules/editors'
import NotFound from './components/pages/not-found.vue'

const routes = [
  { path: '/', component: GettingStarted },
  { path: '/gl/:id?', component: Gl },
  { path: '/gl-effects/:id?', component: GlEffects },
  { path: '/surfaces/:id?', component: Surfaces },
  { path: '/examples/:id?', component: Examples },
  { path: '/flappy', component: Flappy },
  { path: '/raster-filers', component: RasterFilers },
  { path: '/editors/polygon-editor', component: PolygonEditor },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

export { routes }