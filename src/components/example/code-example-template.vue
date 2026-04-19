<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { Builders, ScriptDef, ScriptModule, Settings } from "./code"
import { ParameterList, ScriptList, Telemetry, Toolbar, ToolbarDropdownPanel, ContextMenu, EntityList } from './components'
import { Size } from "smallgame";

const props = defineProps<{ scriptList: ScriptDef[] }>()
const route = useRoute()
const router = useRouter()
const container = ref<HTMLDivElement>()
const fps = ref<HTMLDivElement>()
const scriptId = computed(() => route.params.name as string)
const currentModule = ref<ScriptModule | null>()
const scriptListItems = computed(() => props.scriptList.map((p, i) => ({ id: p.name.replaceAll(' ', '_').toLocaleLowerCase(), name: p.name, category: p.category, codeDir: p.codeDir })) )
const settings = new Settings()

onMounted(async () => {
  await main()
  window.addEventListener('resize', () => {
    clearPrevious()
    main()
  })
})

async function main() {
  const script = !scriptId.value ? props.scriptList[0] : props.scriptList.find(p => p.name.replaceAll(' ', '_').toLocaleLowerCase() === scriptId.value)
  if (!script) {
    console.warn('Script is not found')
    return
  }

  if (!container.value) {
    console.warn('container is not found')
    return
  }

  const width = container.value!.clientWidth 
  const height = container.value!.clientHeight
  const containerSize = new Size(width, height)

  currentModule.value = await script.module({ container: container.value!, fps: fps.value!, width, height, containerSize, builders: new Builders() })
}

function changeScript (id: string) {
  router.push({ params: { name: id }})
}

router.beforeEach(() => { clearPrevious() })
router.afterEach(() => { main() })

function clearPrevious () {
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

</script>
<template>
  <Toolbar>
    <template #project>
      <ToolbarDropdownPanel caption="Projects" :open="settings.showScriptPanel" @toggle="isOpen => settings.showScriptPanel = isOpen">
        <template #content>
          <ScriptList :items="scriptListItems" :selected-id="scriptId" @click="changeScript" />
        </template>
      </ToolbarDropdownPanel>
      
    </template>

    <template #common-space>
      <ToolbarDropdownPanel caption="Telemetry" :open="settings.showTelemetryPanel" @toggle="isOpen => settings.showTelemetryPanel = isOpen">
        <template #content>
          <Telemetry  v-if="currentModule && currentModule.telemetry" :telemetry="currentModule.telemetry" />
        </template>
      </ToolbarDropdownPanel>
    </template>

    <template #viewer-settings>
      <ToolbarDropdownPanel caption="Viewer" :open="settings.showViewerSettingsPanel" @toggle="isOpen => settings.showViewerSettingsPanel = isOpen">
        <template #content>
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

    <template #command-panel>
      <ToolbarDropdownPanel caption="Parameters" :open="settings.showParametersPanel" @toggle="isOpen => settings.showParametersPanel = isOpen">
        <template #content>
          <ParameterList v-if="currentModule" :parameters="currentModule.parameters ?? []" :ui="currentModule.ui ?? { controls: [] }" />  
        </template>
      </ToolbarDropdownPanel>
    </template>
  </Toolbar>

  <div class="example-page show-hiddable">
    <div ref="container" class="container"></div>
    <ContextMenu v-if="currentModule && currentModule.contextMenu" :context="currentModule.contextMenu" />
    <div class="fps" ref="fps"></div>
  </div>
</template>

<style lang="sass">

.example-page
  position: relative
  display: flex
  width: 100%
  height: 100%
  .container
    background-color: #2b2b2b
    width: 100%
    height: calc( 100vh -  100px)

.hiddable
  opacity: 0
.show-hiddable
  &:hover 
    .hiddable
      opacity: 1
</style>

