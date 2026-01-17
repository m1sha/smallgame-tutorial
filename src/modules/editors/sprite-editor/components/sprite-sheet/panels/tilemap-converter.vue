<script setup lang="ts">
import { FormControl, PushButton } from 'vue3-universal-components'
import { useSpriteSheetStore } from '../../../store'

const store = useSpriteSheetStore()

</script>
<template>
  <FormControl caption="Tile Map" class="tilemap-convert-panel">
    
    <PushButton @click="store.convertToTilemap()">Convert To Tile Map</PushButton>
    
  </FormControl>
</template>

<style lang="sass">
  .tilemap-convert-panel
    padding: 4px
    button
      width: 100%
</style>