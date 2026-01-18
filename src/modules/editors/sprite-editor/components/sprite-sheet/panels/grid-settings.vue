<script setup lang="ts">
import { ref, watch } from 'vue';
import { FormControl, FormControlContent, PushButton, TextBox } from 'vue3-universal-components'
import { useSpriteSheetStore } from '../../../store';



const store = useSpriteSheetStore()
const rows = ref(store.currentObject?.rows || 0)
const cols = ref(store.currentObject?.cols || 0)
const offestX = ref(0)
const offestY = ref(0)

const onApplyClick = () => {
  store.setCellDim(+cols.value, +rows.value)
}

watch(() => store.currentObject, () => { 
  if (!store.currentObject) return
  rows.value = store.currentObject.rows
  cols.value = store.currentObject.cols
}, { deep: true })

</script>
<template>
  <FormControl caption="Grid Settings" class="object-settings-panel__grid-settings">
    <FormControlContent>
    <table>
      <tbody>
      <tr>
        <td>
          <label for="">Columns</label>
        </td>
        <td>
          <TextBox v-model.number="cols"/>
        </td>
      </tr>
      <tr>
        <td>
          <label for="">Rows</label>
        </td>
        <td>
          <TextBox v-model.number="rows" />
        </td>
      </tr>
      <tr>
        <td>
          <label for="">Offest X</label>
        </td>
        <td>
          <TextBox v-model.number="offestX" />
        </td>
      </tr>
      <tr>
        <td>
          <label for="">Offset Y</label>
        </td>
        <td>
          <TextBox v-model.number="offestY" />
        </td>
      </tr>
      </tbody>
    </table>
    <div class="button-block">
      <PushButton @click="onApplyClick">Apply</PushButton>
    </div>
    </FormControlContent>
  </FormControl>
</template>


<style lang="sass">
  .object-settings-panel__grid-settings
    .button-block
      display: flex
      justify-content: flex-end
      margin-top: 8px
    td
      &:first-child
        padding-right: 4px
        label
          font-size: .7em
      &:last-child
        input[type="text"]
          max-width: 60px
          text-align: right


</style>