<script setup lang="ts">
import { ref } from 'vue';
import { AgentsStatisticsData } from '../agents-statistics-data'
import { DropDownList, TextBox } from 'vue3-universal-components';
defineProps<AgentsStatisticsData>()
const emit = defineEmits<{ postData: [actionName: string, args?: any] }>()
const populationSize = ref(300)
</script>

<template>
  <div class="agent-statistics-panel">
    <div class="agent-statistics-toolbar">
      <div class="toolbar-section">
        <TextBox v-model="populationSize" caption="Population Size"  />
        <div>
        <button @click="emit('postData', 'create', populationSize)">Create</button>  
        </div>
      </div>

      <div class="toolbar-section">
        <DropDownList :items="[]" caption="Choose Population" />
        <div>
        <button @click="emit('postData', 'load')">Load</button>
        </div>
      </div>

      <div class="toolbar-section">
        <button @click="emit('postData', 'save')">Save</button>
      </div>

    </div>

  <div class="agent-statistics-table v-grid-table">
    <div class="header">
      <div class="header-column">#</div>
      <div class="header-column">Name</div>
      <div class="header-column">Epoch</div>
      <div class="header-column">Fitness</div>
      <div class="header-column">Broken Bricks</div>
      <div class="header-column">Caught Balls</div>
      <div class="header-column">Moves</div>
      <div class="header-column">Outsides</div>
      <div class="header-column">Time Life</div>
      <div class="header-column">Parent A</div>
      <div class="header-column">Parent B</div>
      <div class="header-column">&nbsp;</div>
    </div>

    <div class="row" v-for="agent, i in agents.sort((a, b) => b.fitness - a.fitness)">
      <div class="column">{{ i + 1 }}</div>
      <div class="column">{{ agent.name }}</div>
      <div class="column num">{{ agent.epoch }}</div>
      <div class="column num">{{ agent.fitness.toFixed(3) }}</div>
      <div class="column num">{{ agent.brockenBricks }}</div>
      <div class="column num">{{ agent.cautchBalls }}</div>
      <div class="column num">{{ agent.activeMoving }}</div>
      <div class="column num">{{ agent.outsideMoving }}</div>
      <div class="column num">{{ agent.timeLife }}</div>
      <div class="column num">{{ agent.parentAId }}</div>
      <div class="column num">{{ agent.parentBId }}</div>
      <div class="column"><button @click="emit('postData', 'download-weigths', agent.id)"><i class="fa fa-download"></i></button></div>
    </div>
  </div>
  </div>
</template>

<style lang="css">

.agent-statistics-panel {
  .agent-statistics-toolbar {
    display: flex; 
    gap: 12px; 
    justify-content: space-between;
    margin-bottom: 18px;

    .toolbar-section {
      display: flex; align-items: end; gap: 4px;

      input[type="text"] {
        width: 80px;
      }

      button {
        padding: 5px 8px;
      }
    }
  }


  .agent-statistics-table {
    grid-template-columns: 38px repeat(11, max-content);
    max-height: 43vh;
    overflow-y: auto;
    margin: 4px;
    margin-bottom: 12px;
  }
}


</style>