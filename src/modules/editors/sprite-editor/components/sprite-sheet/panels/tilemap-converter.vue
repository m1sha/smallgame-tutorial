<script setup lang="ts">
import { FormControl, PushButton } from 'vue3-universal-components'
</script>
<template>
  <FormControl caption="Tile Map" class="tilemap-convert-panel">
    
    <PushButton>Convert To Tile Map</PushButton>
    
  </FormControl>
</template>

<style lang="sass">
  .tilemap-convert-panel
    padding: 4px
    button
      width: 100%
</style>