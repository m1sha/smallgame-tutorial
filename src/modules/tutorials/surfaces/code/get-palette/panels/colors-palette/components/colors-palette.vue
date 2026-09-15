<script setup lang="ts">
import ColorTile from './color-tile.vue'
import { IColorsPaletteData } from '../colors-palette-data.ts'
import { ref } from 'vue';
import { removeItem } from 'smallgame/src/utils/array.ts';

const props = defineProps<IColorsPaletteData>()
const emit = defineEmits<{ postData: [ action: string, args?: any ] }>()
const tempCellCount = 32
const selectedColors = ref<string[]>([])
const changeColor = (value: string, index: number) => {
  props.colors[index] = value
  emit('postData', 'changed-color', index)
}
const colorSelect = (value: string, index: number) => {
  if (selectedColors.value.some(p => p === value)) {
    removeItem(selectedColors.value, p => p === value)
    return
  }
  selectedColors.value.push(value)
}
</script>

<template>
  <div class="palette">
    <div class="tools">
      <button 
        :class="{ selected: tool.name === 'eyepicker' }"
        @click="emit('postData', 'eyepicker')"
      >
        <i class="fa fa-eyedropper"></i>
      </button>
    </div>
      
    <div class="palette-grid">
      <ColorTile 
        v-for="color, index in colors" 
        :color="color" 
        :selected="selectedColors.some(p => p === color)" 
        @change-color="v => changeColor(v, index)" 
        @color-select="v => colorSelect(v, index)" 
        />
      
      <div 
        v-for="_ in tempCellCount - colors.length"
        v-if="tempCellCount - colors.length > 0" 
        class="palette-color-tile-empty" 
      ></div>
    </div>
  </div>
</template>

<style>
.palette {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 12px;
  .tools {
    display: flex;
    gap: 4px;
    button.selected {
      background-color: #354;
    }
    button.right {
      margin-left: auto;
    }
  }
  .palette-grid {
    display: grid;
    grid-template-columns: repeat(8, 40px);
    gap: 6px;
    & > .palette-color-tile-empty {
      width: 40px;
      height: 40px;
      border: 1px solid #333;
      border-radius: 4px;
    }
  }

}
</style>