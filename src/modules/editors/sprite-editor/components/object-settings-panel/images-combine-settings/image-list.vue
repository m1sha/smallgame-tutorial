<script setup lang="ts">
import { FormControl, ItemList } from 'vue3-universal-components';
import { useSpriteEditorStore } from '../../../store';

const store = useSpriteEditorStore()

const obj = () => {
  if (store.state.currentObject && store.state.currentObject.type === 'image-combiner-object') return store.state.currentObject
  throw new Error('is not image-combiner-object')
}

</script>

<template>
  
<FormControl caption="Image List" class="image-list-panel">
  <div class="image-list-wrapper">
    <ItemList :items="obj().images">
      <template #list-item-title="{ item }">
        <span>{{ item.name }}</span>
        <span>{{ item.size.width }}x{{ item.size.height }}</span>
      </template>
    </ItemList>
  </div>
</FormControl>
  
</template>

<style lang="sass">
.image-list-panel
  .image-list-wrapper
    margin: 4px 8px
    max-height: 20vh
    overflow-y: auto

  // .images-combine-settings
  //   display: flex
  //   flex-direction: column
  //   gap: 16px
</style>