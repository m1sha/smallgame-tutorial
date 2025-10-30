<script setup lang="ts">
import { onMounted } from 'vue'
import Range from '../../../../../components/range.vue'
import { useEditorStore } from "../../store/editor-store"
import { DepletePaletteFilterSetting } from '../../code/filters'
import { ApplyDepletePaletteFilterCommand, ChangeDepletePaletteFilterValueCommand } from '../../code/commands'

const store = useEditorStore()
const filter = store.appState.getFilterSettings<DepletePaletteFilterSetting>('DepletePaletteFilter')
//const pal = ref<HTMLDivElement>()
//const info = ref<HTMLDivElement>()

onMounted(() => {
  if (!filter) return
  //filter.pal = pal.value!
  //filter.info = info.value!
})

const onInput = (value: number) => { 
  store.sendCommand(new ChangeDepletePaletteFilterValueCommand(value))
}

const onClick = () => store.sendCommand(new ApplyDepletePaletteFilterCommand())
</script>

<template>
  <div class="filter">
    <h3>Deplete Palette</h3>

    <div class="filter-settings">
      <label>Value</label>
      <Range :min="1" :max="256" :step="1"  :value="filter.value" @input="onInput" />
    </div>
    
    <div ref="info">

    </div>
    
    <div ref="pal" style="display: flex; flex-wrap: wrap; gap: 4px; overflow-y: auto; max-height:310px; margin-bottom: 24px"></div>
    
    <button @click="onClick">Apply</button>
  </div>
</template>