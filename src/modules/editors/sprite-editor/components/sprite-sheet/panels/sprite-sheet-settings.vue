<script setup lang="ts">
import BatchList from './batch-list.vue'
import GridSettings from './grid-settings.vue'
import ImageInfo from './image-info.vue'
import TilemapConverter from './tilemap-converter.vue';
</script>

<template>
  <div class="sprite-sheet-settings">
    <TilemapConverter />
    <ImageInfo />
    <GridSettings />
    <BatchList />
  </div>
</template>

<style lang="sass">
  .sprite-sheet-settings
    display: flex
    flex-direction: column
    gap: 16px
</style>