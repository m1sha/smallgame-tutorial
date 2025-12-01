import { HomePage, TutorialsPage, PolygonEditorPage, RasterFiltersPage } from './pages'
import NotFound from './components/pages/not-found.vue'

const routes = [
  { path: '/', component: HomePage, name: 'Home' },
  { path: '/editors/raster-filers', component: RasterFiltersPage, name: 'RasterFilers' },
  { path: '/editors/polygon-editor', component: PolygonEditorPage, name: 'PolygonEditor' },
  { path: '/tutorials/:id?', component: TutorialsPage, name: 'Tutorials' },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

export { routes }