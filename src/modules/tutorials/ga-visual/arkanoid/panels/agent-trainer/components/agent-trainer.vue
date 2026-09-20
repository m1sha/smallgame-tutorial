<script setup lang="ts">
import { AgentsTrainerData } from '../agent-trainer-data';

defineProps<AgentsTrainerData>()
const emit = defineEmits<{ postData: [actionName: string]}>()
</script>

<template>
  <div class="agents-trainer-panel">
    <div class="block">
      <div>
        <span>Epoch</span>
        <span>{{ epoch }}</span>
      </div>
      <div>
        <span>Epochs</span>
        <span>{{ epochs }}</span>
      </div>
      <div>
        <button @click="emit('postData', 'train')">Train</button>
      </div>
    </div>

    <div class="gents-trainer-log">
      <div class="header">
        <div class="column-header">Epoch</div>
        <div class="column-header">Max</div>
        <div class="column-header">Mean</div>
        <div class="column-header">Min</div>
        <div class="column-header">B. Bricks</div>
        <div class="column-header">Catchs</div>
      </div>
      <div class="row" v-for="item of log">
        <div class="column">{{ item.epoch }}</div>
        <div class="column">{{ item.max.toFixed(2) }}</div>
        <div class="column">{{ item.mean.toFixed(2) }}</div>
        <div class="column">{{ item.min.toFixed(2) }}</div>
        <div class="column">{{ item.brockenBricks }}</div>
        <div class="column">{{ item.catchTimes }}</div>
      </div>
    </div>
  </div>

</template>

<style lang="css">
.agents-trainer-panel {
  
  .block {
    font-size: 12px;
    display: flex;
    gap: 16px;
    align-items: center;
    & >div {
      display: flex;
      gap: 8px;
    }
    
  }

  .gents-trainer-log {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    font-size: 12px;

    max-height: 650px;
    overflow-y: auto;

    .header, .row {
      display: contents;

      .column-header, .column {
        padding: 2px 4px;
        min-width: 8ch;
        color: #bbb;
      }
    }
    
  }
}
</style>