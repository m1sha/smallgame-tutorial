import { HomePage, TutorialsPage, PolygonEditorPage, RasterFiltersPage } from './pages'
import NotFound from './components/pages/not-found.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/raster-filers', component: RasterFiltersPage },
  { path: '/editors/polygon-editor', component: PolygonEditorPage },
  { path: '/tutorials/:id?', component: TutorialsPage },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

export { routes }