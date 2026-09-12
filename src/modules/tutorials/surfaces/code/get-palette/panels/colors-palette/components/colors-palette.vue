<script setup lang="ts">
import { ref } from 'vue'
import { Tracker } from 'vue3-universal-components'
import ColorTile from './color-tile.vue'
import { IColorsPaletteData } from '../colors-palette-data.ts'

defineProps<IColorsPaletteData>()
const emit = defineEmits<{ postData: [ action: string ] }>()
const mode = ref<'normal' | 'replace-colors'>('normal')
const thrashold = ref(0.2)
const colorCount = ref(16)
const tempCellCount = 32

const replaceColorTrigger = () => {
  mode.value = mode.value === 'normal' ? 'replace-colors' : 'normal'
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

      <button class="right" title="Replace Colors" @click="replaceColorTrigger">
        <i class="fa fa-chevron-right" v-if="mode === 'normal'"></i>
        <i class="fa fa-chevron-left" v-else></i>
      </button>
    </div>
    

    <div class="palette-grid-wrapper" :class="{ grid: mode === 'replace-colors' }">
      <span class="table-caption">Palette</span>
      <span class="table-caption" v-if="mode === 'replace-colors'">Replace Palette</span>
      <div class="palette-grid">
        <ColorTile :color="color" v-for="color, index in colors" @change-color="v => colors[index] = v" />
        <div v-if="tempCellCount - colors.length > 0" v-for="_ in tempCellCount - colors.length"></div>
      </div>
      
      <div class="palette-grid" v-if="mode === 'replace-colors'">
        <ColorTile :color="color" v-for="color, index in replaceColors" @change-color="v => replaceColors[index] = v" />
        <div v-if="tempCellCount - colors.length > 0" v-for="_ in tempCellCount - colors.length"></div>
      </div>
    </div>

    <div class="command-blocks" v-if="mode === 'replace-colors'">
      <button @click="emit('postData', 'replace-colors')" style="margin-left: auto;">Replace Colors</button>
    </div>

    <div class="command-blocks"  v-if="mode === 'normal'">
      <div class="command-block">
        <span class="header">Indexing</span>
        <div class="checkbox">
          <input type="checkbox" /> <span>Use Palette Colors</span>
        </div>
        <Tracker caption="Colors" v-model="colorCount" :min="2" :max="512" :step="1" />
        <button @click="emit('postData', 'indexing-colors')">Apply</button>
      </div>
      <div class="command-block">
        <span class="header">Erasing</span>
        
        <Tracker caption="Thrashold" v-model="thrashold" :min="0" :max="1" :step="0.05" />
        <button @click="emit('postData', 'erase-colors')">Apply</button>
      </div>
    </div>

    
  </div>
  
</template>

<style>
.palette {
  display: flex;
  flex-direction: column;
  gap: 12px;
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

  .table-caption {
    font-size: 13px;
  }

  .palette-grid-wrapper {
    
    &.grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px 24px;
    }
  }

  .palette-grid {
    display: grid;
    grid-template-columns: repeat(8, 40px);
    gap: 4px;
    & > div {
      width: 40px;
      height: 40px;
      border: 1px solid #333;
      border-radius: 4px;
    }
  }

  .command-blocks {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
    .command-block {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8px;

      border: 1px solid #333;
      border-radius: 4px;
      padding: 8px 4px;

      .header {
        font-size: 12px;
        border-bottom: 1px solid #333;
        padding-bottom: 4px;
      }

      .checkbox {
        font-size: 12px;
        display: flex;
        align-items: center;
        gap: 4px;
        color: #ddd;
      }

      button {
        margin-top: auto;
      }
    }
  }
}
</style>