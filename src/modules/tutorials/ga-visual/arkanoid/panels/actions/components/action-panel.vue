<script setup lang="ts">
import { DropDownList } from 'vue3-universal-components';
import { ActionsData } from '../actions-data';
defineProps<ActionsData>()
const emit = defineEmits<{postData: [ actionName: string, args?: any ] }>()
</script>

<template>
  <div class="ga-actions-panel">
    <div>
      <DropDownList :items="[
        { id: 'interactive', name: 'Interactive' },
        { id: 'step', name: 'Step By Step' },
        { id: 'agent', name: 'Agent Play' }
      ]" caption="Game Mode" v-model="parameters.mode" class="ga-dropdown" @update:model-value="emit('postData', 'reset')" />
    </div>
    <div class="controls">
      <button @click="emit('postData', 'reset')">Reset</button>
      <div class="frames-score">
        <span>Frames: </span><span>{{ parameters.frames }}</span>
        <span>Score:  </span><span>{{ parameters.score.toFixed(3) }}</span>
      </div>
    </div>
    <div class="controls" v-show="parameters.mode === 'step'">
      <button @click="emit('postData', 'move', 1)">Left</button>
      <button @click="emit('postData', 'move', 0)">Stay</button>
      <button @click="emit('postData', 'move', 2)">Right</button>
    </div>
  </div>
</template>

<style lang="css">
.ga-actions-panel {
  display: flex;
  flex-direction: column;
  padding-bottom: 12px;
  gap: 18px;
  width: 11vw;
  .ga-dropdown {
    .dropdown-caption {
      border-color: #333 !important;
      border-radius: 4px !important;
    }
  }
  
  .controls {
    display: flex;
    gap: 8px;

    button {
      min-width: 60px;
    }

    .frames-score {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 4px 8px;
      font-size: 12px;
      color: #999;
      span {
        &:nth-child(even) {
          color: #aaa;
        }
      }
    }
  }
}
</style>
