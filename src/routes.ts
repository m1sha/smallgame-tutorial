import { HomePage, TutorialsPage, PolygonEditorPage, RasterFiltersPage, GamesPage, SpriteEditorPage } from './pages'
import NotFound from './components/pages/not-found.vue'
import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', component: HomePage, name: 'Home', meta: { title: 'Home' } },
  { path: '/editors/raster-filers', component: RasterFiltersPage, name: 'RasterFilers', meta: { title: 'Raster Filers' } },
  { path: '/editors/polygon-editor', component: PolygonEditorPage, name: 'PolygonEditor', meta: { title: 'Polygon Editor' } },
  { path: '/editors/sprite-editor/:projectId?', component: SpriteEditorPage, name: 'SpriteEditor', meta: { title: 'Sprite Editor' } },
  { path: '/sandbox/:name?', component: TutorialsPage, name: 'Sandbox', meta: { title: 'Sandbox' } },
  { path: '/games/:id?', component: GamesPage, name: 'GamesPage', meta: { title: 'Games' } },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound, meta: { title: 'Not Found :(' } }
]

export { routes }