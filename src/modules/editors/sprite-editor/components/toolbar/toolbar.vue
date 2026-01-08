<script setup lang="ts">
import { UploadManyButton, UploadButton, DropDownList, Tracker } from 'vue3-universal-components'
import { useSpriteEditorStore } from '../../store'
import { ref, watch } from 'vue'
const store = useSpriteEditorStore()
const onCombineImage = async (files: File[]) => {
  await store.createImageCombiner(files)
}
const onCreateSpriteSheet = async (file: File) => {
  await store.createSpriteSheet(file)
}
const zoomId = ref(1)
watch(() => zoomId.value, () => {
  store.setZoom(+zoomId.value)
})
</script>
<template>
  <div class="sprite-editor-toolbar">
    <UploadButton @change="onCreateSpriteSheet">
      Create Sprite Sheet
    </UploadButton>

    <UploadManyButton @change="onCombineImage">
      Combine images
    </UploadManyButton>

    <div style="width: 300px;display: flex; gap: 8px; align-items: center;">
      <label>Zoom</label>
      <Tracker v-model="zoomId" :min="1" :max="8" :step="0.1" />
<!-- <DropDownList v-model="zoomId" :items="[ { id: '1', name: '100%' }, { id: '1.5', name: '150%' }, { id: '2', name: '200%' }, { id: '4', name: '400%' } ]">

    </DropDownList> -->
    </div>

    
  </div>
</template>

<style lang="sass">
  .sprite-editor-toolbar
    height: 30px
    display: flex
    gap: 4px
    padding: 4px 8px
</style>