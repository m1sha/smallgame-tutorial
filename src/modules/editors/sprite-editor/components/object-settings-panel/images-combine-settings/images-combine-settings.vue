<script setup lang="ts">
import CombineMode from './combine-mode.vue';
import GridSettings from './grid-settings.vue';
import ImageList from './image-list.vue'
import OutputImage from './output-image.vue';
</script>

<template>
  <div class="images-combine-settings">
    <ImageList />
    <CombineMode />
    <GridSettings />
    <OutputImage />
  </div>
</template>

<style lang="sass">
  .images-combine-settings
    display: flex
    flex-direction: column
    gap: 16px

    min-width: 10vw
</style>