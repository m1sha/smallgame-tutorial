<script setup lang="ts">
import { UploadManyButton, UploadButton } from 'vue3-universal-components'
import { useSpriteEditorStore } from '../../../store'

const store = useSpriteEditorStore()
const onCombineImage = async (files: File[]) => {
  await store.createImageCombiner(files)
}
const onCreateSpriteSheet = async (file: File) => {
  await store.createSpriteSheet(file)
}

</script>
<template>
  <div class="sprite-editor-toolbar">
    <UploadButton @change="onCreateSpriteSheet">
      Create Sprite Sheet
    </UploadButton>

    <UploadManyButton @change="onCombineImage">
      Combine images to Sprite Sheet
    </UploadManyButton>

    <!-- <div style="width: 300px;display: flex; gap: 8px; align-items: center;">
      <label>Zoom</label>
      <Tracker v-model="zoomId" :min="1" :max="8" :step="0.1" />
    </div> -->

    
  </div>
</template>

<style lang="sass">
  .sprite-editor-toolbar
    height: 30px
    display: flex
    gap: 4px
    padding: 4px 8px
</style>