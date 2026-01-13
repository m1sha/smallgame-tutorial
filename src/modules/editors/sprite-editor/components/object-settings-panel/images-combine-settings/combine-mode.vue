<script setup lang="ts">
import { DropDownList, FormControl, ItemList, PushButton, TextBox } from 'vue3-universal-components';
import { useSpriteEditorStore } from '../../../store';
import { ref } from 'vue';

const store = useSpriteEditorStore()

const obj = () => {
  if (store.state.currentObject && store.state.currentObject.type === 'image-combiner-object') return store.state.currentObject
  throw new Error('is not image-combiner-object')
}

const selectedId = ref('1')


</script>

<template>
  
<FormControl caption="Combine Mode" class="image-list-panel">
  <div class="combine-mode-settings">
    <DropDownList v-model="selectedId" :items="[{ id: '1', name: 'Tile Grid' }]"/>
  </div>
  
</FormControl>
  
</template>

<style lang="sass">
.image-list-panel
  .combine-mode-settings
    margin: 4px 8px
    
    

  // .images-combine-settings
  //   display: flex
  //   flex-direction: column
  //   gap: 16px
</style>