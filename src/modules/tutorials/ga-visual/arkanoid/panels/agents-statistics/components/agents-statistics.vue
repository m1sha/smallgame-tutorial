<script setup lang="ts">
import { AgentsStatisticsData } from '../agents-statistics-data';

defineProps<AgentsStatisticsData>()
</script>

<template>
  <div class="agent-statistics-panel">
  <div class="agent-statistics-table">
    <div class="header">
      <div class="header-column">#</div>
      <div class="header-column">Name</div>
      <div class="header-column">Epoch</div>
      <div class="header-column">Fitness</div>
      <div class="header-column">Brocken Bricks</div>
      <div class="header-column">Cautch Balls</div>
      <div class="header-column">Active Moving</div>
      <div class="header-column">Outside Moving</div>
    </div>

    <div class="row" v-for="agent in agents.sort((a, b) => b.fitness - a.fitness)">
      <div></div>
      <div class="column">{{ agent.name }}</div>
      <div class="column">{{ agent.epoch }}</div>
      <div class="column">{{ agent.fitness.toFixed(3) }}</div>
      <div class="column">{{ agent.brockenBricks }}</div>
      <div class="column">{{ agent.cautchBalls }}</div>
      <div class="column">{{ agent.activeMoving }}</div>
      <div class="column">{{ agent.outsideMoving }}</div>
    </div>
  </div>
  </div>
</template>

<style lang="css">
.agent-statistics-table {
  display: grid;
  grid-template-columns: 40px repeat(7, 1fr);
  font-size: 12px;

  max-height: 50vh;
  overflow-y: auto;

  .header-column {
    position: sticky;
    top: 0;
    background-color: #444;
    padding-bottom: 8px;
  }

  .header, .row {
    display: contents;
  }
}
</style>