<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { Builders, IToastMessage, PanelManager, ScriptDef, ScriptModule, Settings } from "./code"
import { ParameterList, ScriptList, Telemetry, Toolbar, ToolbarDropdownPanel, ContextMenu, EntityList, Viewport as ViewportComponent, Toasts } from './components'
import { Size } from "smallgame";
import { Viewport } from "../../modules/shared"
import { runScript } from "../../modules/tutorials/script-runner"
import { IScriptCategory } from "./code/script-category"
import { IScriptListItem } from "./code/script-list-item"
import { useScriptsStore } from "./store"
import { removeItem } from "smallgame/src/utils"
import Panels from "./components/panels/panels.vue"
import { CommonModal, CommonModalComponent } from "./components/modals"
import { Modals } from "./code/modal"
import ProjectInfo from "./components/project-info/project-info.vue";

const props = defineProps<{ items: IScriptListItem[], categories: IScriptCategory[] }>()
const store = useScriptsStore()
const scriptList = ref<ScriptDef[]>([])
for (const item of props.items) {
  const cat = props.categories.find(p => item.categoryId == p.id)
  if (!cat) continue

  scriptList.value.push({
    name: item.name,
    category: cat.name,
    codeDir: item.codeDir,
    subCategory: cat.subCategories.find(p => p.id === item.subCategoryId)?.name
  })
}
const route = useRoute()
const router = useRouter()
const container = ref<HTMLDivElement>()
const fps = ref<HTMLDivElement>()
const scriptId = computed(() => route.params.name as string)
const script = computed(() => !scriptId.value ? scriptList.value[0] : scriptList.value.find(p => p.name.replaceAll(' ', '_').toLocaleLowerCase() === scriptId.value))
const currentModule = ref<ScriptModule | null>()
const scriptListItems = computed(() => scriptList.value.map((p, i) => ({ id: p.name.replaceAll(' ', '_').toLocaleLowerCase(), name: p.name, category: p.category, codeDir: p.codeDir, subCategory: p.subCategory })) )
const settings = new Settings()
const usePan = ref(false)

const viewport = ref(new Viewport())

const messages = ref<IToastMessage[]>([])
const commonModalComponent = ref<CommonModalComponent>()
let modals: Modals | null = null

onMounted(async () => {
  store.set(props.items, props.categories)
  await main()
  window.addEventListener('resize', () => {
    clearPrevious()
    main()
  })
})

async function main() {
  
  if (!script.value) {
    console.warn('Script is not found')
    return
  }

  if (!container.value) {
    console.warn('container is not found')
    return
  }
  
  
  const containerSize = new Size(container.value!.clientWidth, container.value!.clientHeight)
  const builders = new Builders()
  let moduleDisposer: (() => void) | null = null
  const disposer = (callback: () => void) => moduleDisposer = callback

  modals = new Modals(commonModalComponent)
  
  const data = { 
    container: container.value!, 
    fps: fps.value!, 
    containerSize, 
    builders,
    globalViewport: viewport.value,
    disposer,
    messanger: {
      info: (message: string) => {
        messages.value.push({ message })
      }
    },
    panels: new PanelManager(),
    modals
  }
  
  currentModule.value = await runScript(script.value.codeDir, data) || {}
  currentModule.value.panels = data.panels.items

  if (builders.has('ui') && !currentModule.value.ui) {
    currentModule.value.ui = builders.ui().build()
  }

  if (builders.has('telemetry') && !currentModule.value.telemetry) {
    currentModule.value.telemetry = builders.telemetry().build()
  }

  if (builders.has('entities') && !currentModule.value.entities) {
    currentModule.value.entities = builders.entities().build()
  }

  if (moduleDisposer && !currentModule.value.dispose) {
    currentModule.value.dispose = moduleDisposer
  }
}

function changeScript (id: string) {
  router.push({ params: { name: id }})
}

router.beforeEach(() => { clearPrevious() })
router.afterEach(() => { main() })

function clearPrevious () {
  viewport.value.home()
  if (container.value)
  while(true) {
    const child = container.value.children[0]
    if (!child) break
    container.value.removeChild(child)
  }

  if (currentModule.value) {
    const module = currentModule.value
    module.dispose?.()
  }
}

function onToastClose (message: IToastMessage) {
  removeItem(messages.value, p => p === message)
}

function onModalClose (result: string) {
  modals?.close(result)
}

function onViewportAction (actionName: 'pan' | 'home' | 'fit' | 'zoomIn' | 'zoomOut') {
  if (actionName === 'pan') usePan.value = !usePan.value

  
  if (actionName === 'home') viewport.value.home()
  if (actionName === 'fit') viewport.value.fit()
  if (actionName === 'zoomIn') viewport.value.zoomIn()
  if (actionName === 'zoomOut') viewport.value.zoomOut()
}

</script>
<template>
  <div class="code-example-template-grid">
    <ProjectInfo :script @menu-click="settings.showScriptPanel = true" @settings-click="settings.showParametersPanel = !settings.showParametersPanel" >
      <div class="fps" ref="fps"></div>
    </ProjectInfo>

     <ParameterList v-if="currentModule && settings.showParametersPanel"  :ui="currentModule.ui ?? { controls: [] }" />  
     <ScriptList v-if="settings.showScriptPanel" :items="scriptListItems" :selected-id="scriptId" @click="changeScript" @close="settings.showScriptPanel = false" />
    
  <!-- <Toolbar>
    <template #common-space>
      <ToolbarDropdownPanel caption="Telemetry" :open="settings.showTelemetryPanel" @toggle="isOpen => settings.showTelemetryPanel = isOpen">
        <template #content>
          <Telemetry  v-if="currentModule && currentModule.telemetry" :telemetry="currentModule.telemetry" />
        </template>
      </ToolbarDropdownPanel>
    </template>
    <template #entity-list>
      <ToolbarDropdownPanel caption="Objects" :open="settings.showObjectsPanel" @toggle="isOpen => settings.showObjectsPanel = isOpen">
        <template #content>
          <EntityList v-if="currentModule && currentModule.entities" :entities="currentModule.entities" />
        </template>
      </ToolbarDropdownPanel>
    </template>
  </Toolbar> -->

  <div class="example-page show-hiddable">
    <div ref="container" class="container"></div>
    <ContextMenu v-if="currentModule && currentModule.contextMenu" :context="currentModule.contextMenu" />
    <Panels :items="currentModule?.panels ?? []" />
    
  </div>
 
  <ViewportComponent 
    :viewport="viewport" 
    :use-pan="usePan" 
    @action="onViewportAction"
    />
  </div>

  <CommonModal ref="commonModalComponent" @close="onModalClose" />
  <Toasts :messages @close="onToastClose" />
</template>

<style lang="sass">

.code-example-template-grid
  display: grid
  grid-template-rows: 26px 1fr 

.example-page
  position: relative
  display: flex
  width: 100%
  height: 100%
  .container
    background-color: #2b2b2b
    width: 100%
    height: calc( 100vh -  30px)

.hiddable
  opacity: 0
.show-hiddable
  &:hover 
    .hiddable
      opacity: 1
</style>

