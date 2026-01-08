<script setup lang="ts">
import { useSpriteEditorStore } from '../../store'
import BatchList from './batch-list.vue'
import GridSettings from './grid-settings.vue'
import ImageInfo from './image-info.vue'

const store = useSpriteEditorStore()
</script>
<template>
  <div class="object-settings-panel" v-if="store.state.currentObject">
    <ImageInfo />
    <GridSettings />
    <BatchList />
  </div>
</template>

<style lang="sass">
  .object-settings-panel
    position: absolute
    top: 4px
    right: 8px
    background-color: rgba(55, 55, 55, 0.4941176471)
    border: 1px solid var(--panel-border)
    display: flex
    flex-direction: column
    gap: 16px
</style>