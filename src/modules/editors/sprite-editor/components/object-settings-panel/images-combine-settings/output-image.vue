<script setup lang="ts">
import { FormControl, PushButton } from 'vue3-universal-components'
import { useImagesCombinerStore} from '../../../store'

const store = useImagesCombinerStore()
</script>

<template>
  
<FormControl caption="Output image" class="image-list-panel">
  <div class="combine-mode-settings">
    <p>Image Size: </p>
    <PushButton @click="store.downloadCombinedImage()">Dowload</PushButton>
  </div>
  
</FormControl>
  
</template>

<style lang="sass">
.image-list-panel
  .combine-mode-settings
    margin: 4px 8px
</style>