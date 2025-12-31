<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import ParameterList from './components/parameters/parameter-list.vue'
import ScriptList from './components/script-list/script-list.vue'
import { ScriptDef, ScriptModule } from "./code"
import Telemetry from "./components/telemetry/telemetry.vue"

const props = defineProps<{ scriptList: ScriptDef[] }>()
const route = useRoute()
const router = useRouter()
const container = ref<HTMLDivElement>()
const fps = ref<HTMLDivElement>()
const scriptId = computed(() => route.params.name as string)
const currentModule = ref<ScriptModule | null>()
const scriptListItems = computed(() => props.scriptList.map((p, i) => ({ id: p.name.replaceAll(' ', '_').toLocaleLowerCase(), name: p.name, category: p.category })) )

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

  currentModule.value = await script.module({ container: container.value!, fps: fps.value!, width, height })
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
  <div class="example-page-toolbar">
    
  </div>
  <div class="example-page show-hiddable">
    <ScriptList :items="scriptListItems" :selected-id="scriptId" @click="changeScript" class="hiddable" />
    <Telemetry  v-if="currentModule && currentModule.telemetry" :telemetry="currentModule.telemetry" />
    <div ref="container" class="container"></div>
    
    <ParameterList v-if="currentModule" :parameters="currentModule.parameters ?? []" :ui="currentModule.ui ?? { controls: [] }" class="hiddable" />  
    <div class="fps" ref="fps"></div>
  </div>
</template>

<style lang="sass">
.example-page-toolbar 
  background-color: #333
  height: 24px
  width: 100%
.example-page
  position: relative
  display: flex
  width: 100%
  height: 100%
  .container
    background-color: #2b2b2b
    width: 100%
    height: calc( 100vh -  90px)

.hiddable
  opacity: 0
.show-hiddable
  &:hover 
    .hiddable
      opacity: 1
</style>

