<script setup lang="ts">
import { AgentsStatisticsData } from '../agents-statistics-data'
defineProps<AgentsStatisticsData>()
const emit = defineEmits<{ postData: [actionName: string, args?: any] }>()
</script>

<template>
  <div class="agent-statistics-panel">
  <div class="agent-statistics-table">
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

.agent-statistics-table {
  display: grid;
  grid-template-columns: 38px repeat(11, max-content);
  font-size: 12px;

  max-height: 50vh;
  overflow-y: auto;

  margin: 4px;
  margin-bottom: 12px;

  .header-column {
    position: sticky;
    top: 0;
    background-color: #444;
    color: #aaa;
    padding: 2px 4px;
    padding-bottom: 8px;
    border-bottom: 1px solid #313131;

    &:last-child {
      padding-right: 18px;
    }
  }
  .column { 
    padding: 2px 4px; 
    color: #888;
    border-bottom: 1px solid #555;
    &.num {
      text-align: right;
    }
    &:last-child {
      padding-right: 18px;
    }

    button {
      padding: 2px 4px;
      min-width: fit-content;
    }
  }
  .row {
    &:nth-child(odd) {
      .column {
        background-color: #3e3e3e;
      }
    }
  }

  .header, .row {
    display: contents;
  }
}
</style>