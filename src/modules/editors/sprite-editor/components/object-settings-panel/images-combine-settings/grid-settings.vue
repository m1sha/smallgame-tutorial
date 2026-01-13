<script setup lang="ts">
import { FormControl, ItemList, PushButton, TextBox } from 'vue3-universal-components';
import { useSpriteEditorStore } from '../../../store';
import { ref } from 'vue';

const store = useSpriteEditorStore()

const obj = () => {
  if (store.state.currentObject && store.state.currentObject.type === 'image-combiner-object') return store.state.currentObject
  throw new Error('is not image-combiner-object')
}

const cols = ref(0)
const rows = ref(0)

</script>

<template>
  
<FormControl caption="Grid Settings" class="image-list-panel">
  <div class="grid-settings">
    <table>
      <tbody>
        <tr>
          <td>Columns</td>
          <td><TextBox v-model="cols" type="number" /></td>
        </tr>
        <tr>
          <td>Rows</td>
          <td><TextBox v-model="rows" type="number" /></td>
        </tr>
      </tbody>
    </table>

    <div>
      <PushButton>Apply</PushButton>
    </div>
  </div>
</FormControl>
  
</template>

<style lang="sass">
.image-list-panel
  .grid-settings
    margin: 4px 8px
    table
      margin-bottom: 8px
    td
      &:first-child
        font-size: .75em
      &:last-child
        padding-left: 8px
        input[type="number"]
          width: 80px
    

  // .images-combine-settings
  //   display: flex
  //   flex-direction: column
  //   gap: 16px
</style>