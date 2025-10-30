<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import ParameterList from './components/parameters/parameter-list.vue'
import ScriptList from './components/script-list/script-list.vue'
import { ScriptDef, ScriptModule } from "./code"

const props = defineProps<{ scriptList: ScriptDef[] }>()
const route = useRoute()
const router = useRouter()
const container = ref<HTMLDivElement>()
const fps = ref<HTMLDivElement>()
const index = computed(() => parseInt(route.params.id as string) || 0)
const currentModule = ref<ScriptModule | null>()

onMounted(async () => {
  await main()
})

async function main() {
  const script = props.scriptList[index.value]
  if (!script) {
    console.warn('Script is not found')
    return
  }

  const width = container.value!.clientWidth 
  const height = container.value!.clientHeight

  currentModule.value = await script.module({ container: container.value!, fps: fps.value!, width, height })
}

function changeScript (id: number) {
  router.push({ params: { id }})
}

router.beforeEach(() => {
  if (currentModule.value) {
    const module = currentModule.value
    module.dispose?.()
  }

  if (container.value)
  while(true) {
    const child = container.value.children[0]
    if (!child) break
    container.value.removeChild(child)
  }
})

router.afterEach(() => { main() })

</script>
<template>
  <div class="example-page show-hiddable">
    <ScriptList :items="scriptList.map((p, i) => ({ id: i + '', name: p.name, category: p.category }))" :select-index="index" @click="changeScript" class="hiddable" />
    <div ref="container" class="container"></div>
    
    <ParameterList v-if="currentModule" :parameters="currentModule.parameters ?? []" class="hiddable" />  
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
    height: calc( 100vh -  60px)

.hiddable
  opacity: 0
.show-hiddable
  &:hover 
    .hiddable
      opacity: 1
</style>

