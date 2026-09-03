<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ 
  cellSize: number, 
  zoom: number, 
  offsetX: number, 
  offsetY: number,
  oddColor: string,
  evenColor: string,
  
}>()

const gridStyle = computed(() => ({
  '--x-cell-size': `${props.cellSize}px`,
  '--x-color-1': `${props.oddColor}`,
  '--x-color-2': `${props.evenColor}`,
  '--x-zoom': `${props.zoom}`,
  '--x-pan-x': `${props.offsetX}px`,
  '--x-pan-y': `${props.offsetY}px`,
}))
</script>

<template>
  <div class="chess-pattern" :style="gridStyle"></div>
</template>

<style lang="css">
.chess-pattern {
  /* --cell-size: 10px;
  --color-1: #242424;
  --color-2: #2e2e2e; */
  position: absolute;
  inset: 0;
  background:
    conic-gradient(var(--x-color-1) 25%, var(--x-color-2) 0 50%, var(--x-color-1) 0 75%, var(--x-color-2) 0)
    var(--pan-x) var(--x-pan-y) / calc(var(--x-cell-size) * 2 * var(--x-zoom)) calc(var(--x-cell-size) * 2 * var(--x-zoom));
}
</style>