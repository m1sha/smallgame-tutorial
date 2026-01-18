<script setup lang="ts">
import { FormControl, PushButton } from 'vue3-universal-components';
import { useSpriteEditorStore } from '../../../store'

const store = useSpriteEditorStore()
</script>

<template>
<div class="image-settings"  v-if="store.state.selectedObjects.length > 0 && store.state.selectedObjects[0].type === 'image-object'" >
  <FormControl caption="Image Info">
    <div class="panel-content">
      <div>Image Size {{ store.state.selectedObjects[0].size.width }}x{{ store.state.selectedObjects[0].size.height }}</div>
    </div>
  </FormControl>

  <FormControl caption="Operations">
    <div class="panel-content">
    <PushButton>Convert to SpriteSheet</PushButton>
    </div>
  </FormControl>

</div>
</template>

<style lang="sass">
  .image-settings
    display: flex
    flex-direction: column
    gap: 16px
    .panel-content
      padding: 4px 8px
</style>