<script setup lang="ts">
import BatchList from './batch-list.vue'
import GridSettings from './grid-settings.vue'
import ImageInfo from './image-info.vue'
</script>

<template>
  <div class="sprite-sheet-settings">
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