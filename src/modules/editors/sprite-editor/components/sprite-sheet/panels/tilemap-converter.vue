<script setup lang="ts">
import { FormControl, FormControlContent, PushButton } from 'vue3-universal-components'
import { useSpriteSheetStore } from '../../../store'

const store = useSpriteSheetStore()

</script>
<template>
  <FormControl caption="Tile Map" class="tilemap-convert-panel">
    <FormControlContent>
      <PushButton @click="store.convertToTilemap()">Convert To Tile Map</PushButton>
    </FormControlContent>
  </FormControl>
</template>

<style lang="sass">
  .tilemap-convert-panel
    button
      width: 100%
</style>