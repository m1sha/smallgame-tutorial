<script setup lang="ts">
import { TrainLogRecord } from '../agent-trainer-data'

defineProps<{ log: TrainLogRecord[] }>()
</script>

<template>
  <div class="gents-trainer-log v-grid-table">
      <div class="header">
        <div class="header-column">Epoch</div>
        <div class="header-column">Max</div>
        <div class="header-column">Mean</div>
        <div class="header-column">Min</div>
        <div class="header-column">B. Bricks</div>
        <div class="header-column">Catchs</div>
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
  
</template>