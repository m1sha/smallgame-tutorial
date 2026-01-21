<script setup lang="ts">
import { UploadButton } from 'vue3-universal-components'
import { useSpriteEditorStore } from '../../../store'

const store = useSpriteEditorStore()

const onCreateSpriteSheet = async (file: File) => {
  await store.createSpriteSheet(file)
}

</script>
<template>
  <div class="sprite-editor-toolbar">
    <UploadButton @change="onCreateSpriteSheet">
      Create Sprite Sheet
    </UploadButton>
    
  </div>
</template>

<style lang="sass">
  .sprite-editor-toolbar
    height: 30px
    display: flex
    gap: 4px
    padding: 4px 8px
</style>