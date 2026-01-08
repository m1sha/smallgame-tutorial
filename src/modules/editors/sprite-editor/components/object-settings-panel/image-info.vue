<script setup lang="ts">
import { FormControl, GridTable } from 'vue3-universal-components';
import { useSpriteEditorStore } from '../../store';

  const store = useSpriteEditorStore()
</script>
<template>

  <FormControl caption="Image Info">
    <GridTable :rows="[{ id: '1' }, { id: '2' }]" :column-count="2" :no-headers="true" class="object-settings-panel__image-info">
      <template #row="{ columnIndex, rowIndex }">
        <p v-if="columnIndex === 0 && rowIndex === 0">Image Size</p>
        <p v-if="columnIndex === 0 && rowIndex === 2">Pos</p>
        <p v-if="columnIndex === 0 && rowIndex === 1">Tile Size</p>
        <p v-if="columnIndex === 1 && rowIndex === 0">{{ store.state.currentObject.rect.width }} x {{ store.state.currentObject.rect.height }} px</p>
        <p v-if="columnIndex === 1 && rowIndex === 2">{{ store.state.currentObject.rect.x }} x {{ store.state.currentObject.rect.y }}</p>

        <p v-if="columnIndex === 1 && rowIndex === 1">{{ store.state.currentObject.tileSize.width }} x {{ store.state.currentObject.tileSize.height }} px</p>
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