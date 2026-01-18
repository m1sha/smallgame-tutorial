<script setup lang="ts">
import { useSpriteEditorStore } from '../../../store'
import { ImagesCombineSettings } from '../../images-combine'
import { SpriteSheetSettings } from '../..//sprite-sheet'
import { ImageSettings } from '../../image'
import { ObjectGroupSettings } from '../../object-group'

const store = useSpriteEditorStore()
</script>
<template>
  <div class="object-settings-panel">
    <ObjectGroupSettings v-if="store.state.selectedObjects.length > 1 && store.state.selectedObjects[0].type === 'image-object'" />
    <ImageSettings v-if="store.state.selectedObjects.length === 1 && store.state.selectedObjects[0].type === 'image-object'"/>
    <SpriteSheetSettings v-if="store.state.selectedObjects.length === 1 && store.state.selectedObjects[0].type === 'sprite-sheet-object'" /> 
    <ImagesCombineSettings v-if="store.state.selectedObjects.length === 1 && store.state.selectedObjects[0].type === 'image-combiner-object'" />
  </div>
</template>

<style lang="sass">
  .object-settings-panel
    position: absolute
    top: 4px
    right: 8px
    background-color: rgba(55, 55, 55, 0.4941176471)
    border: 1px solid var(--panel-border)
</style>