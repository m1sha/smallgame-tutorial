<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ 
  cellSize: number, 
  zoom: number, 
  offsetX: number, 
  offsetY: number,
  lineColor: string,
  show: boolean
}>()

const gridStyle = computed(() => ({
  '--cell-size': `${props.cellSize}px`,
  '--line-color': `${props.lineColor}`,
  '--zoom': `${props.zoom}`,
  '--pan-x': `${props.offsetX}px`,
  '--pan-y': `${props.offsetY}px`,
}))
</script>

<template>
  <div class="grid-pattern" :class="{ show }" :style="gridStyle"></div>
</template>

<style lang="css">
.grid-pattern {
  position: absolute;
  inset: 0;
  background-size: calc(var(--cell-size) * var(--zoom)) calc(var(--cell-size) * var(--zoom));
  background-image: linear-gradient(var(--line-color) 1px, transparent 1px), linear-gradient(90deg, var(--line-color) 1px, transparent 1px);
  background-position: var(--pan-x) var(--pan-y);
  opacity: 0;
  transition: ease-out opacity 0.5s;

  &.show {
    opacity: 1;
  }
}
</style>