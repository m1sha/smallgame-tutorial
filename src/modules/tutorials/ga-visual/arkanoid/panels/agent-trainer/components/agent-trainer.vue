<script setup lang="ts">
import { DropDownList, TextBox } from 'vue3-universal-components';
import { AgentsTrainerData } from '../agent-trainer-data';
import TrainingLog from './training-log.vue';

defineProps<AgentsTrainerData>()
const emit = defineEmits<{ postData: [actionName: string]}>()
</script>

<template>
  <div class="agents-trainer-panel">
    <div class="section">
      <div class="section-header">
        <p>Training Settings</p>
      </div>

      <div>
        <TextBox v-model="definition.elitePercent" caption="Percent Of Elite Individuals" />
      </div>

      <div>
        <span style="font-size: 14px; color: #888;">Reproduction</span>
      </div>
      <div style="display: flex; gap: 18px;">
        <TextBox v-model="definition.reproduction.tournamentCount" caption="Tournament Count" />
        <DropDownList v-model="definition.reproduction.crossover.type" :items="[{ id: 'UniformCrossover', name: 'Uniform' }, { id: 'BlendCrossover', name: 'Blend' }]" caption="Crossover"/>
      </div>

      <div>
        <span style="font-size: 14px; color: #888;">Mutation</span>
      </div>
      <div style="display: flex; gap: 18px;">
        <TextBox v-model="definition.mutation.rate" caption="Rate" />
        <TextBox v-model="definition.mutation.strength" caption="Strength" />
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <p>Training Settings</p>
      </div>
      <div class="block">
        <div>
          <span>Epoch</span>
          <span>{{ training.epoch }}</span>
        </div>
        <div style="display: flex; align-items: center;">
          <span>Epochs</span>
          <TextBox v-model="training.epochs" />
        </div>
        <div>
          <button @click="emit('postData', 'train')">Train</button>
        </div>
      </div>
    </div>

    <TrainingLog :log />

  </div>

</template>

<style lang="css">
.agents-trainer-panel {
  height: 82vh;

  .section-header {
    background-color: #252525;
    padding: 8px;
    p { 
      padding: 0; margin: 0px; 
      font-size: 14px;
      color: #777;
    }
  }

  .section {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 18px;
  }
  
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
    grid-template-columns: repeat(6, 1fr);
    max-height: 350px;
    overflow-y: auto;
  }
}
</style>