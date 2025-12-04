import { HomePage, TutorialsPage, PolygonEditorPage, RasterFiltersPage, GamesPage } from './pages'
import NotFound from './components/pages/not-found.vue'

const routes = [
  { path: '/', component: HomePage, name: 'Home' },
  { path: '/editors/raster-filers', component: RasterFiltersPage, name: 'RasterFilers' },
  { path: '/editors/polygon-editor', component: PolygonEditorPage, name: 'PolygonEditor' },
  { path: '/tutorials/:id?', component: TutorialsPage, name: 'Tutorials' },
  { path: '/games/:id?', component: GamesPage, name: 'GamesPage' },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

export { routes }