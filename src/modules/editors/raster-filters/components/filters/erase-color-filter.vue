<script setup lang="ts">
import Range from '../../../../../components/range.vue'
import { useEditorStore } from "../../store/editor-store"
import { EraseColorFilterSetting } from '../../code/filters/erase-color-filter'
import { ApplyEraseColorFilterColorCommand, ChangeEraseColorFilterValueCommand } from '../../code/commands'

const store = useEditorStore()
const filter = store.appState.getFilterSettings<EraseColorFilterSetting>('EraseColorFilter')

const onInput = (value: number) => { 
  store.sendCommand(new ChangeEraseColorFilterValueCommand(value))
}

const onClick = () => store.sendCommand(new ApplyEraseColorFilterColorCommand())

</script>

<template>
  <div class="filter">
    <h3>Erase color</h3>

    <div class="filter-settings">
      <label>Color</label>
      <input type="color" value="#ffffff" />

      <label>Value</label>
      <Range :min="0" :max="10000" :step="100"  :value="filter.value" @input="onInput" />
    </div>
    
    <button @click="onClick">Apply</button>
  </div>
</template>