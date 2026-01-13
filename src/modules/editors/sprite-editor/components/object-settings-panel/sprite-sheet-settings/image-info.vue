<script setup lang="ts">
import { FormControl, GridTable } from 'vue3-universal-components'
import { useSpriteSheetStore } from '../../../store'

const store = useSpriteSheetStore()
</script>
<template>

  <FormControl caption="Image Info" v-if="store.currentObject">
    <GridTable :rows="[{ id: '1' }, { id: '2' }]" :column-count="2" :no-headers="true" class="object-settings-panel__image-info">
      <template #row="{ columnIndex, rowIndex }">
        <p v-if="columnIndex === 0 && rowIndex === 0">Image Size</p>
        <p v-if="columnIndex === 0 && rowIndex === 2">Pos</p>
        <p v-if="columnIndex === 0 && rowIndex === 1">Tile Size</p>
        <p v-if="columnIndex === 1 && rowIndex === 0">{{ store.currentObject.rect.width }} x {{ store.currentObject.rect.height }} px</p>
        <p v-if="columnIndex === 1 && rowIndex === 2">{{ store.currentObject.rect.x }} x {{ store.currentObject.rect.y }}</p>

        <p v-if="columnIndex === 1 && rowIndex === 1">{{ store.currentObject.tileSize.width }} x {{ store.currentObject.tileSize.height }} px</p>
      </template>
    </GridTable>
  </FormControl>
  
</template>

<style lang="sass">
  .object-settings-panel__image-info
    padding: 4px
    & > div
      display: flex
      gap: 8px
      p
        margin: 0
        font-size: .75em
</style>