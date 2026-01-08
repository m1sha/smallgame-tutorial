<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ObjectSettingsPanel, PreviewPanel, Toolbar } from './components'
import { useSpriteEditorStore } from './store'

const container = ref<HTMLDivElement>()
const store = useSpriteEditorStore()

onMounted(() => {
  const width = container.value!.clientWidth 
  const height = container.value!.clientHeight
  store.createViewer({ width, height }, container.value!)
})
</script>
<template>
  <div class="sprite-editor-page">
    <Toolbar />
    <div class="container-wrapper">
      <div ref="container" class="container"></div>
      <ObjectSettingsPanel />
      <PreviewPanel />
    </div>
</div>
</template>

<style lang="sass">
.sprite-editor-page
  display: flex
  flex-direction: column
  .container-wrapper
    position: relative
  .container
    background-color: #2b2b2b
    width: 100%
    height: calc( 100vh -  100px)
</style>