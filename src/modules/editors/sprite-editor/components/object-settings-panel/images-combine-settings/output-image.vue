<script setup lang="ts">
import { DropDownList, FormControl, ItemList, PushButton, TextBox } from 'vue3-universal-components';
import { useSpriteEditorStore } from '../../../store';
import { ref } from 'vue';

const store = useSpriteEditorStore()

const obj = () => {
  if (store.state.currentObject && store.state.currentObject.type === 'image-combiner-object') return store.state.currentObject
  throw new Error('is not image-combiner-object')
}


</script>

<template>
  
<FormControl caption="Output image" class="image-list-panel">
  <div class="combine-mode-settings">
    <p>Image Size: </p>
    <PushButton @click="store.downloadCombinedImage()">Dowload</PushButton>
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